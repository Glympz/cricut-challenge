import { Component } from '@angular/core';
import { OrderViewModel } from '../../../core/services/api.service/api.types';
import { ApiService } from '../../../core/services/api.service/api.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncPipe } from '@angular/common';

interface OrdersPageViewModel {
    orders: OrderViewModel[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.scss',
})
export class OrdersPageComponent {
    protected readonly viewModel: Observable<OrdersPageViewModel>;

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService) {
        this.viewModel = this.getViewModel();
    }

    private getViewModel() {
        return this.authService.authenticatedCustomer.pipe(
            switchMap(customer => this.apiService.getOrdersByCustomer(customer!.id)),
            map(orders => {
                return {
                    orders,
                };
            })
        );
    }
}
