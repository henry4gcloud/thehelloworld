import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPage} from "./pages/list/list.page";
import {DetailPage} from "./pages/detail/detail.page";

const routes: Routes = [
    {
        path: '',
        component: ListPage
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
}
