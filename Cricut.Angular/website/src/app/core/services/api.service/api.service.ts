import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { CustomerViewModel, NewOrderViewModel, OrderViewModel } from './api.types';
import { deleteOrder, getCustomerByEmail, getCustomerViewModel, getOrderViewModel, getOrderViewModelsByCustomer, submitOrderViewModel } from './api.fake.datasource';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    getCustomer(customerId: number): Observable<CustomerViewModel | undefined> {
        return of(getCustomerViewModel(customerId));
    }

    getOrder(orderId: number): Observable<OrderViewModel | undefined> {
        return of(getOrderViewModel(orderId));
    }

    getOrdersByCustomer(customerId: number): Observable<OrderViewModel[]> {
        return of(getOrderViewModelsByCustomer(customerId));
    }

    submitOrder(newOrder: NewOrderViewModel): Observable<OrderViewModel> {
        return of(submitOrderViewModel(newOrder));
    }

    deleteOrder(orderId: number): Observable<undefined> {
        deleteOrder(orderId);
        return of(undefined);
    }

    signIn(email: string): Observable<CustomerViewModel | undefined> {
        return of(getCustomerByEmail(email));
    }
}
