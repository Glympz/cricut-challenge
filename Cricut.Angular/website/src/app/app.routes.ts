import { Routes } from '@angular/router';
import { authChildGuard } from './core/guards/auth.guard';
import { NotFoundPageComponent } from './shared/components/not-found/not-found.page';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes) },
    {
        path: 'customer',
        canActivateChild: [authChildGuard],
        loadChildren: () => import('./features/customer/customer.routes').then(m => m.customerRoutes),
    },
    { path: '**', component: NotFoundPageComponent }
];
