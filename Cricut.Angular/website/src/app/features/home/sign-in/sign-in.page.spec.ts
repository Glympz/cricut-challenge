import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPageComponent } from './sign-in.page';

describe('SignInComponent', () => {
    let component: SignInPageComponent;
    let fixture: ComponentFixture<SignInPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignInPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SignInPageComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
