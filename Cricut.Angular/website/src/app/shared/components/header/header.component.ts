import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface AppViewModel {
    isSignedIn: boolean;
    usersName: string | undefined;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [AsyncPipe, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
                };
            })
        );
    }

    signOut():void {
        this.authService.signOut();
    }
}
