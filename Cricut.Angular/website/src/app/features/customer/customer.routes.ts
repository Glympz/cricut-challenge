import { Routes } from "@angular/router";
import { CustomerPageComponent } from "./customer/customer.page";

export const customerRoutes: Routes = [
    { path: '', component: CustomerPageComponent },
    { path: 'orders', loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPageComponent) },
    { path: 'order/:orderId', loadComponent: () => import('./order-detail/order-detail.page').then(m => m.OrderDetailPageComponent) },
];
