import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router, NavigationStart, Event, NavigationError, NavigationEnd} from '@angular/router';
import {ListPage} from './pages/list/list.page';
import {DetailPage} from './pages/detail/detail.page';
import {TestPage} from './pages/test/test.page';

const routes: Routes = [
    {
        path: '',
        component: ListPage
    },
    {
        path: 'abc',
        component: DetailPage
    },
    {
        path: 'test',
        component: TestPage
    },
    {
        path: ':id',
        component: DetailPage
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(private router: Router) {
        // this.router.events.subscribe((event: Event) => {
        //     //console.log(this.router );
        //     //debugger
        //    console.log(event.constructor.name);
        //    // console.log(this.router['rootContexts'].contexts.get('primary').route);
        //     if (event instanceof NavigationStart) {
        //         // @ts-ignore
        //         console.log(this.router['rootContexts'].contexts.get('primary').route);
        //     }
        //
        //     if (event instanceof NavigationEnd) {
        //         // Hide loading indicator
        //     }
        //
        //     if (event instanceof NavigationError) {
        //         // Hide loading indicator
        //
        //         // Present error to user
        //         console.log(event.error);
        //     }
        // });

    }
}
