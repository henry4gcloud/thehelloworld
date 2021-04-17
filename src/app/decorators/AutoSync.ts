
import {SyncProviderInterface} from '../providers/SyncProviderInterface';
import {DependencyContext} from './dependency-injection';
import {Model} from '../models/Model';
import {SyncHandler} from './SyncHandler';

export type SyncProviderType =  new () => SyncProviderInterface<Model>;

interface SyncContainer extends SyncProviderInterface<any>{
    syncData: Array<any>;
    latestSync: Date;
}

function defineSyncProviderBean(type: SyncProviderType): SyncHandler {
    const name: string = type.name.replace(/^./, matched => matched.toLowerCase()) + SyncHandler.name;
    let value = DependencyContext.getDependency(name);
    if (!value) {
        value = new SyncHandler(new type());
        DependencyContext.setDependency({name, value});
    }
    return value;
}

export function SyncProvider(type?: SyncProviderType): (clazz: SyncProviderType) => void{
    return (clazz: SyncProviderType) => {
        if (!type) {
            type = clazz;
        }
        defineSyncProviderBean(clazz);
    };
}

export function AutoSync(syncProviderType: SyncProviderType): (...agrs: any[]) => void {

    const syncHandler: SyncHandler = defineSyncProviderBean(syncProviderType);


    return (target: any, key: string) => {
        let value = target[key];
        let proxy;
        if (value){
            proxy = syncHandler.addSyncItem(value);
        }

        const getter = () => {
            return proxy;
        };

        const setter = (next: any) => {
            if (value){
                syncHandler.removeSyncItem(value);
                proxy = null;
            }
            value = next;
            if (value){
                proxy = syncHandler.addSyncItem(value);
            }
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
