import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EMPTY, first, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

interface SignInPageViewModel {

}

interface SignInForm {
    email: string;
}

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './sign-in.page.html',
    styleUrl: './sign-in.page.scss',
})
export class SignInPageComponent implements OnInit {
    readonly viewModel: Observable<SignInPageViewModel>
    readonly signInForm: SignInForm = {
        email: '',
    };

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.viewModel = this.getViewModel();
    }

    ngOnInit(): void {
        this.authService.IsSignedIn.pipe(first()).subscribe(isSignedIn => {
            if (isSignedIn) {
                this.router.navigate(['/']);
            }
        });
    }

    private getViewModel(): Observable<SignInPageViewModel> {
        return EMPTY;
    }

    signIn(): void {
        if (this.authService.signIn(this.signInForm.email, '')) {
            this.router.navigate(['/']);
        } else {
            alert('sign-in-failed');
        }
    }
 }
