import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailPageComponent } from './order-detail.page';

describe('OrderDetailComponent', () => {
    let component: OrderDetailPageComponent;
    let fixture: ComponentFixture<OrderDetailPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderDetailPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderDetailPageComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
