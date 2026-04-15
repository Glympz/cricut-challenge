import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home.page';
import { authGuard } from '../../core/guards/auth.guard';

export const homeRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'sign-in', loadComponent: () => import('./sign-in/sign-in.page').then((m) => m.SignInPageComponent) },
    {
        path: 'place-order',
        canActivate: [ authGuard ],
        loadComponent: () => import('./place-order/place-order.page').then((m) => m.PlaceOrderPageComponent) },
];
