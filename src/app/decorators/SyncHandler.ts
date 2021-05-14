import {SyncProviderInterface} from '../providers/SyncProviderInterface';
import {Model} from '../models/Model';
import Timeout = NodeJS.Timeout;

export class SyncHandler {
    private syncProvider: SyncProviderInterface<Model>;
    private models: Array<Model> = [];
    private latestSyncAt = new Date();
    private interval: Timeout;
    private handler: ProxyHandler<Model> = {
        set: (target, property, value, receiver) => {
            console.log('proxy set =====');
            debugger
            target[property] = value;
            target.latestUpdatedAt = new Date();
            this.initInterval();
            return true;
        },
        get: (target, property, receiver) => {
            console.log('proxy get =====');
            if (property === '_._target_._'){
                return target;
            }else {
                const value = target[property];
                return value;
            }
        }
    };

    constructor(syncProvider: SyncProviderInterface<Model>) {
        this.syncProvider = syncProvider;
    }

    private initInterval(): void {
        if (typeof this.interval === 'undefined') {
            this.interval = setInterval(() => {
                clearInterval(this.interval);
                this.interval = undefined;
                this.executeSync();
            }, 10 * 1000);
        }
    }

    private executeSync(): void {
        const dataWillBeSync = this.models.filter(model =>
            !(model as Model).id ||
            (((model as Model).latestUpdatedAt?.getTime() || 0) > this.latestSyncAt.getTime())
        );
        this.syncProvider.syncAll(dataWillBeSync);
        this.latestSyncAt.setTime(new Date().getTime());
    }

    addSyncItem(model: Model): unknown {
        debugger
        if (!!model) {
            this.models.push(model);
            const proxy = new Proxy(model, this.handler);
            // this.syncProvider.syncOne(model);
            (this.syncProvider.syncOne(model) as Promise<Model>) .then((m) => {
                Object.entries(proxy);
            });
            return proxy;
        } else {
            return null;
        }

    }

    removeSyncItem(model: Model): void {
        this.models.forEach((item, index) => {
            if (item === model) {
                this.models.splice(index, 1);
            }
        });
    }

    isProxyWrapper(model: Model): boolean{
        return !!model['_._target_._'];
    }
}
