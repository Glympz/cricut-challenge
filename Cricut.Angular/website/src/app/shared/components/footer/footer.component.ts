import { Component } from '@angular/core';

interface FooterViewModel {
    copyrightYear: string;
}

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    protected viewModel: FooterViewModel;

    constructor() {
        this.viewModel = { copyrightYear: new Date().getFullYear().toString() };
    }
}
