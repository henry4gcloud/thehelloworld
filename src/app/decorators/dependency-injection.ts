import 'reflect-metadata';
import {InjectorService} from '../services/InjectorService';

interface DependencyWrapper {
    name?: string;
    type?: new (...args: any[]) => any;
    value?: any;
    // define?: () => any;
    // defineContext?: any;
}

const DependencyContainer: Array<DependencyWrapper> = [];

type Type = new(...args: any[]) => any;

export class DependencyContext {
    public static getDependency(nameOrType: string | Type): any {
        let type: Type;
        let name: string;
        let dependency: DependencyWrapper;
        if (typeof nameOrType === 'string'){
            name = nameOrType as string;
            dependency = DependencyContainer.find(dependencyItem =>
                dependencyItem.name === name);
        }else {
            type = nameOrType;
            name = type.name.replace(/^./, matched => matched.toLowerCase());
            dependency = DependencyContainer.find(dependencyItem =>
                dependencyItem.type === type);
            if (!dependency) {
                const value = InjectorService.getInstance(nameOrType);
                if (!!value) {
                    dependency = {name, type, value};
                    DependencyContainer.push(dependency);
                }
            }
        }
        return dependency?.value;
    }

    public static setDependency(data: {name: string,  type?: Type, value?: any}): void {
        //
        const {name, type, value} = data;
        const dependency = DependencyContainer.find(dependencyItem =>
            dependencyItem.name === name || (!!type  && !!dependencyItem.type && type === dependencyItem.type));
        if (!!dependency) {
            Object.assign(dependency, {name, type, value});
        } else {
            DependencyContainer.push({name, type, value});
        }
    }

}


export function Dependency(nameOrType?: Type): (...agrs: any[]) => void {
    return (target: any, property: string) => {
        if (!nameOrType){
            // Reflect.getMetadata('design:typeinfo', target, property).type();
            nameOrType = Reflect.getMetadata('design:type', target, property);
        }

        const getter = () => {
            const dependencyValue = DependencyContext.getDependency(nameOrType);
            return dependencyValue;
        };
        const setter = (next: any) => {
            console.log(`Can't set directly a dependency.`);
        };

        Object.defineProperty(target, property, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

export function DependencyDefine(option: {name?: string, type?: new (...args: Array<any>) => any}): (...agrs: any[]) => void {
    let {type} = option;
    const {name} = option;
    return (target: any, method: string, ) => {

        const defineContext = target;
        const define = target[method];

        const returnType: new (...args: Array<any>) => any = Reflect.getMetadata('design:type', target, method);
        if (returnType !== Promise){
            if (!type) {
                type = returnType;
            }
        }

        Promise.resolve(define.call(defineContext)).then(value => {
            DependencyContext.setDependency({name, type, value});
        });
    };
}






