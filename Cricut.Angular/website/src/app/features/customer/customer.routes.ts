import { Routes } from "@angular/router";
import { OrdersPageComponent } from "./orders/orders.page";

export const customerRoutes: Routes = [
    { path: '', component: OrdersPageComponent },
    { path: 'orders', component: OrdersPageComponent },
    { path: 'order/:orderId', loadComponent: () => import('./order-detail/order-detail.page').then(m => m.OrderDetailPageComponent) },
];
