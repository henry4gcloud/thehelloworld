import {SyncProviderInterface} from './SyncProviderInterface';
import {HttpClient} from '@angular/common/http';
import {Model} from '../models/Model';

export abstract class HttpSyncProviderAbstract<M extends Model> implements SyncProviderInterface<M> {

    private httpClient: HttpClient;// = new HttpClient();
    protected httpOptions: {};
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
        let remoteModel: M;
        debugger
        if (model.id) {
            remoteModel = await this.httpClient.get<M>(`${this.syncUrl}/${model.id}`, this.httpOptions).toPromise();
        }
        if (remoteModel?.latestUpdatedAt?.getMilliseconds() < model.latestUpdatedAt?.getMilliseconds()) {
            model.latestUpdatedAt = new Date();
            remoteModel = await this.httpClient.post<M>(this.syncUrl, model, this.httpOptions).toPromise();
        }

        Object.entries(remoteModel).forEach(([key, value]) => {
            model[key] = value;
        });
        return model;
    }
}
