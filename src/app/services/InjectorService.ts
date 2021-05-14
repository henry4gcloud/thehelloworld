import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DependencyContext} from '../decorators/dependency-injection';

@Injectable({
    providedIn: 'root'
})
export class InjectorService {
    private static injector: Injector;

    // tslint:disable-next-line:typedef
    public static setAppInjector(injector: Injector) {
        if (this.injector) {
            console.error('Programming error: AppInjector was already set');
        } else {
            this.injector = injector;
        }
    }

    // tslint:disable-next-line:typedef
    public static getInstance(clazz: new() => void) {
        return this.injector.get(clazz);
    }
}
