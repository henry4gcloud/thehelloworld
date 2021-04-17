import {SyncProviderInterface} from '../providers/SyncProviderInterface';
import {Model} from '../models/Model';
import Timeout = NodeJS.Timeout;


const handler =  {
    set: (target, property, value, receiver) => {
        target[property] = value;
        target.latestUpdatedAt = new Date();
        return true;
    },
    get: (target, property, receiver) => {
        const value = target[property];
        return value;
    }
};


export class SyncHandler {
    private syncProvider: SyncProviderInterface<Model>;
    private models: Array<Model> = [];
    private latestSyncAt = new Date();
    private interval: Timeout;
    private handler: ProxyHandler<Model> = {
        set: (target, property, value, receiver) => {
            target[property] = value;
            target.latestUpdatedAt = new Date();
            return true;
        },
        get: (target, property, receiver) => {
            const value = target[property];
            return value;
        }
    };

    constructor(syncProvider: SyncProviderInterface<Model>) {
        this.syncProvider = syncProvider;
    }

    private initInterval(): void {
        if (typeof this.interval === 'undefined') {
            this.interval = setInterval(() => {
                clearInterval(this.interval);
                this.executeSync();
            }, 3 * 60 * 1000);
        }
    }

    private executeSync(): void {
        const dataWillBeSync = this.models.filter(model =>
            !(model as Model).id || (model as Model).latestUpdatedAt.getTime() > this.latestSyncAt.getTime()
        );
        this.syncProvider.syncAll(dataWillBeSync);
        this.latestSyncAt.setTime(new Date().getTime());
    }

    addSyncItem(model: Model): unknown {
        if (!!model) {
            this.models.push(model);
            const proxy = new Proxy(model, handler);
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
}
