import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerViewModel, NewOrderViewModel, OrderViewModel } from './api.types';
import { getCustomerByEmail, getCustomerViewModel, getOrderViewModel, getOrderViewModelsByCustomer, submitOrderViewModel } from './api.fake.datasource';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    getCustomer(customerId: number): Observable<CustomerViewModel> {
        return of(getCustomerViewModel(customerId));
    }

    getOrder(orderId: number): Observable<OrderViewModel | undefined> {
        return of(getOrderViewModel(orderId));
    }

    getOrdersByCustomer(customerId: number): Observable<OrderViewModel[]> {
        return of(getOrderViewModelsByCustomer(customerId));
    }

    submitOrder(newOrder: NewOrderViewModel): OrderViewModel {
        return submitOrderViewModel(newOrder);
    }

    signIn(email: string): CustomerViewModel {
        return getCustomerByEmail(email);
    }
}
