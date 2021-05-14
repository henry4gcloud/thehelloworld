import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
// https://gist.github.com/martinobordin/39bb1fe3400a29c1078dec00ff76bba9

@Injectable()
export class DateHttpInterceptor implements HttpInterceptor {
    // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!req.body && typeof req.body === 'object'){
            req.body._id = req.body.id;
            req.body.id = undefined;
        }
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    event.body.id = event.body._id;
                    event.body._id = undefined;
                    this.convertToDate(event.body);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                    }
                }
            }),
        );
    }

    convertToDate(body): any {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object') {
                this.convertToDate(value);
            }
        }
    }

    isIso8601(value): boolean {
        if (value === null || value === undefined) {
            return false;
        }

        return this.iso8601.test(value);
    }
}