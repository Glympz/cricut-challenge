import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CustomerViewModel, NewOrderViewModel, OrderViewModel } from './api.types';

/// TODO: Implement XSRF protection

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiBaseUrl;
    }

    getCustomer(customerId: number): Observable<CustomerViewModel> {
        return this.http.get<CustomerViewModel>(`${this.baseUrl}/v1/customers/${customerId}`);
    }

    getOrder(orderId: number): Observable<OrderViewModel> {
        return this.http.get<OrderViewModel>(`${this.baseUrl}/v1/orders/${orderId}`);
    }

    getOrdersByCustomer(customerId: number): Observable<OrderViewModel[]> {
        return this.http.get<OrderViewModel[]>(`${this.baseUrl}/v1/customers/${customerId}/orders`);
    }

    submitOrder(newOrder: NewOrderViewModel): Observable<OrderViewModel> {
        return this.http.post<OrderViewModel>(`${this.baseUrl}/v1/orders`, newOrder);
    }

    signIn(email: string) {
        return this.http.post(`${this.baseUrl}/v1/auth/signin`, { email });
    }
}
