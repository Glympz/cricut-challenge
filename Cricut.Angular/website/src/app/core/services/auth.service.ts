import { Injectable } from "@angular/core";
import { map, ReplaySubject } from "rxjs";
import { CustomerViewModel } from "./api.service/api.types";
import { ApiService } from "./api.service/api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly authenticatedCustomer = new ReplaySubject<CustomerViewModel | undefined>(1);

    constructor(private readonly apiService: ApiService) {
        this.authenticatedCustomer.next(undefined);
    }

    get AuthenticatedCustomer() {
        return this.authenticatedCustomer;
    }

    get IsSignedIn() {
        return this.authenticatedCustomer.pipe(
            map((customer) => !!customer)
        );
    }

    signIn(email: string, password: string): boolean {
        const customer = this.apiService.signIn(email);

        if (!!customer) {
            this.authenticatedCustomer.next(customer);
            return true;
        }

        return false;
    }

    signOut(): void {
        this.authenticatedCustomer.next(undefined);
    }
}
