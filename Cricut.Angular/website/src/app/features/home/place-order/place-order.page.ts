import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { first, switchMap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service/api.service';
import { Router } from '@angular/router';
import { NewOrderViewModel, OrderItemViewModel } from '../../../core/services/api.service/api.types';
import { FormsModule } from '@angular/forms';
import { createProduct } from '../../../core/services/api.service/api.fake.datasource';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface PlaceOrderForm {
    item1Selected: boolean;
    item2Selected: boolean;
    item3Selected: boolean;
}

@Component({
    selector: 'app-place-order.page',
    standalone: true,
    imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule],
    templateUrl: './place-order.page.html',
    styleUrl: './place-order.page.scss',
})
export class PlaceOrderPageComponent {
    protected readonly placeOrderForm: PlaceOrderForm = {
        item1Selected: false,
        item2Selected: false,
        item3Selected: false,
    };

    constructor(
        private readonly authService: AuthService,
        private readonly apiService: ApiService,
        private readonly router: Router
    ) { }

    placeOrder(): void {
        this.authService.authenticatedCustomer.pipe(
            first(),
            switchMap((customer) => {
                const order: NewOrderViewModel = {
                    customer: customer!,
                    orderItems: this.buildOrderItemList(this.placeOrderForm),
                };

                return this.apiService.submitOrder(order);
            })
        ).subscribe((newOrder => {
            this.router.navigate(['/customer/order', newOrder.id]);
        }));
    }

    private buildOrderItemList(placeOrderForm: PlaceOrderForm): OrderItemViewModel[] {
        const orderItems: OrderItemViewModel[] = [];

        if (placeOrderForm.item1Selected) {
            orderItems.push({
                product: createProduct(),
                quantity: 1,
            });
        }

        if (placeOrderForm.item2Selected) {
            orderItems.push({
                product: createProduct(),
                quantity: 1,
            });
        }

        if (placeOrderForm.item3Selected) {
            orderItems.push({
                product: createProduct(),
                quantity: 1,
            });
        }

        return orderItems;
    }
 }
