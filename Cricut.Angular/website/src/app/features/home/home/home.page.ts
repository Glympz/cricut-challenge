import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface HomePageViewModel {
    isSignedIn: boolean;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [AsyncPipe, RouterModule],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePageComponent {
    protected readonly viewModel: Observable<HomePageViewModel>;

    constructor(private readonly authService: AuthService) {
        this.viewModel = this.getViewModel();
    }

    private getViewModel(): Observable<HomePageViewModel> {
        return this.authService.isSignedIn.pipe(
            map(isSignedIn => {
                return {
                    isSignedIn,
                };
            })
        );
    }
 }
