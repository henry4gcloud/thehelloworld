
import {SyncProviderInterface} from '../providers/SyncProviderInterface';
import {DependencyContext} from './dependency-injection';
import {Model} from '../models/Model';
import {SyncHandler} from './SyncHandler';

export type SyncProviderType =  new () => SyncProviderInterface<Model>;

const PROXY_PROPERTY_DECORATOR_KEY = 'PROXY_PROPERTY_DECORATOR_KEY';
const VALUE_PROPERTY_DECORATOR_KEY = 'VALUE_PROPERTY_DECORATOR_KEY';

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

// tslint:disable-next-line:typedef
export function AutoSync(syncProviderType: SyncProviderType){

    // tslint:disable-next-line:only-arrow-functions
    return (target: any, key: string) => {
        const syncHandler: SyncHandler = defineSyncProviderBean(syncProviderType);
        // tslint:disable-next-line:typedef
        function getter(){
            const proxy = Reflect.getMetadata(PROXY_PROPERTY_DECORATOR_KEY, this);
            return proxy;
        }
        // tslint:disable-next-line:typedef
        function setter(next: any){
            console.log(this);
            let value = Reflect.getMetadata(VALUE_PROPERTY_DECORATOR_KEY, this);
            let proxy = Reflect.getMetadata(PROXY_PROPERTY_DECORATOR_KEY, this);

            if (value) {
                if (value === next || proxy === next){ // ngOnchange()
                    return;
                }else {
                    syncHandler.removeSyncItem(value);
                    proxy = null;
                }
            }
            value = next;
            if (value) {
                proxy = syncHandler.addSyncItem(value);
                Reflect.defineMetadata(VALUE_PROPERTY_DECORATOR_KEY, value, this);
                Reflect.defineMetadata(PROXY_PROPERTY_DECORATOR_KEY, proxy, this);
            }

        }
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        }
    };
}
