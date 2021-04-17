import 'reflect-metadata';
import {PromiseType} from 'protractor/built/plugins';

interface DependencyWrapper {
    name?: string;
    type?: new (...args: any[]) => any;
    value?: any;
    // define?: () => any;
    // defineContext?: any;
}

const DependencyContainer: Array<DependencyWrapper> = [];

export class DependencyContext {
    public static getDependency(nameOrType: any): any {
        const dependency = DependencyContainer.find(dependencyItem =>
            dependencyItem.name === nameOrType)
        ||
        DependencyContainer.find(dependencyItem =>
            nameOrType === dependencyItem.type);
        // if (dependency) {
        //     return dependency.value;
        // } else {
        //     return undefined;
        // }
        return dependency?.value;
    }

    public static setDependency(data: {name: string,  type?: new (...args: any[]) => any,
        value?: any}): void {
        //
        const {name, type, value} = data;
        const dependency = DependencyContainer.find(dependencyItem =>
            dependencyItem.name === name || (!!type  && !!dependency.type && type === dependency.type));
        if (dependency) {
            Object.assign(dependency, {name, type, value});
        } else {
            DependencyContainer.push({name, type, value});
        }
    }

}


export function Dependency(nameOrType?: any): (...agrs: any[]) => void {
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






