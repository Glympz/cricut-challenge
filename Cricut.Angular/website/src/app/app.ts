import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface AppViewModel {
    isSignedIn: boolean;
    usersName: string | undefined;
    copyrightYear: string;
}

@Component({
    selector: 'app-root',
    imports: [AsyncPipe, RouterModule, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected viewModel: Observable<AppViewModel>;

    constructor(private readonly authService: AuthService) {
        this.viewModel = this.getViewModel();
    }

    private getViewModel(): Observable<AppViewModel> {
        return this.authService.authenticatedCustomer.pipe(
            map(customer => {
                return {
                    isSignedIn: !!customer,
                    usersName: customer?.name,
                    copyrightYear: new Date().getFullYear().toString(),
                };
            })
        );
    }

    signOut():void {
        this.authService.signOut();
    }
}
