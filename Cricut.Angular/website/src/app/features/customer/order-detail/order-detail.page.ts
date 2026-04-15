import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service/api.service';
import { OrderViewModel } from '../../../core/services/api.service/api.types';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

interface OrderDetailPageViewModel {
    order: OrderViewModel | undefined;
}

interface DeleteOrderConfirmationDialogData {
    orderId: number;
}

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [AsyncPipe, MatDialogModule],
    templateUrl: './order-detail.page.html',
    styleUrl: './order-detail.page.scss',
})
export class OrderDetailPageComponent {
    @ViewChild('deleteOrderConfirmationDialog') deleteOrderConfirmationDialog!: TemplateRef<DeleteOrderConfirmationDialogData>;
    protected readonly viewModel: Observable<OrderDetailPageViewModel>;

    constructor(
        private readonly apiService: ApiService,
        private readonly activedRoute: ActivatedRoute,
        private readonly dialog: MatDialog,
        private readonly router: Router) {
        this.viewModel = this.getViewModel();
    }

    private getViewModel(): Observable<OrderDetailPageViewModel> {
        return this.activedRoute.paramMap.pipe(
            map(params => +params.get('orderId')!),
            switchMap(orderId => this.apiService.getOrder(orderId)),
            map(order => {
                return {
                    order,
                };
            }));
    }

    deleteOrder(orderId: number): void {
        const dialogRef = this.dialog.open(this.deleteOrderConfirmationDialog, {
            data: { orderId },
        });

        dialogRef.afterClosed().pipe(
            switchMap((dialogResult): Observable<boolean> => {
                const result = !!dialogResult;

                if (result) {
                    return this.apiService.deleteOrder(orderId).pipe(map(() => result));
                }

                return of(result);
            })
        ).subscribe(result => {
            if (result) {
                this.router.navigate(['/customer/orders']);
            }
        });
    }
}
