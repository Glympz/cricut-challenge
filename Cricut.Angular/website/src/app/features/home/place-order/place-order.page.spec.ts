import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderPageComponent } from './place-order.page';

describe('PlaceOrderPage', () => {
    let component: PlaceOrderPageComponent;
    let fixture: ComponentFixture<PlaceOrderPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlaceOrderPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PlaceOrderPageComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
