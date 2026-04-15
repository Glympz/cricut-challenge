import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPageComponent } from './orders.page';
import { provideRouter } from '@angular/router';

describe('OrdersComponent', () => {
    let component: OrdersPageComponent;
    let fixture: ComponentFixture<OrdersPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrdersPageComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(OrdersPageComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
