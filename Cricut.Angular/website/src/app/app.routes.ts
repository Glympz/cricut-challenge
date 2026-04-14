import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found/not-found.page';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes) },
    { path: 'customer', loadChildren: () => import('./features/customer/customer.routes').then(m => m.customerRoutes) },
    { path: '**', component: NotFoundPageComponent }
];
