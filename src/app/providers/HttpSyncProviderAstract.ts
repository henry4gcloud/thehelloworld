import {SyncProviderInterface} from './SyncProviderInterface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Model} from '../models/Model';
import {Dependency} from '../decorators/dependency-injection';

export abstract class HttpSyncProviderAbstract<M extends Model> implements SyncProviderInterface<M> {

    private headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    @Dependency()
    private httpClient: HttpClient;
    protected httpOptions: any = { headers: this.headers };
    protected syncUrl = '';

    // options: {
    //     headers?: HttpHeaders | {[header: string]: string | string[]},
    //     observe?: 'body' | 'events' | 'response',
    //     params?: HttpParams|{[param: string]: string | string[]},
    //     reportProgress?: boolean,
    //     responseType?: 'arraybuffer'|'blob'|'json'|'text',
    //     withCredentials?: boolean,
    // }

    async syncAll(models: Array<M>): Promise<Array<M>> {
        return await Promise.all(models.map(async (model: M) => {
            return await this.syncOne(model);
        }));
    }

    async syncOne(model: M): Promise<M> {
        let remoteModel: any; // M;
        if (model.id) {
            remoteModel = await this.httpClient.get<M>(`${this.syncUrl}/${model.id}`, this.httpOptions).toPromise();
            const latestUpdateAt = model.latestUpdatedAt?.getTime() || 0;
            const remoteLatestUpdateAt = remoteModel?.latestUpdatedAt?.getTime() || 1;
            if (latestUpdateAt > remoteLatestUpdateAt) {
                remoteModel = await this.httpClient.patch<M>
                (`${this.syncUrl}/${model.id}`,
                    Object.assign({}, model, {id: undefined}), this.httpOptions)
                    .toPromise();
            }
        } else {
            if (Object.values(model).filter(m => !!m).length > 0){
                remoteModel = await this.httpClient.post<M>
                (this.syncUrl, Object.assign({}, model), this.httpOptions)
                    .toPromise();
            }
        }
        if (remoteModel) {
            // remoteModel = Object.assign(model, remoteModel, {id: remoteModel['_id'], _id: undefined});
            Object.entries(remoteModel).filter(([key, value]) => value).forEach(([key, value]) => {
                model[key] = value;
            });
        }
        return model;
    }

}
