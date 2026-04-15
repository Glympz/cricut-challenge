import { Injectable } from "@angular/core";
import { map, Observable, ReplaySubject, tap } from "rxjs";
import { CustomerViewModel } from "./api.service/api.types";
import { ApiService } from "./api.service/api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly authenticatedCustomer$ = new ReplaySubject<CustomerViewModel | undefined>(1);

    constructor(private readonly apiService: ApiService) {
    }

    get authenticatedCustomer(): Observable<CustomerViewModel | undefined> {
        return this.authenticatedCustomer$.asObservable();
    }

    get isSignedIn() {
        return this.authenticatedCustomer$.pipe(
            map((customer) => !!customer)
        );
    }

    signIn(email: string, password: string): Observable<boolean> {
        return this.apiService.signIn(email).pipe(
            tap(customer => {
                if (!!customer) {
                    this.authenticatedCustomer$.next(customer);
                }
            }),
            map((customer) => !!customer)
        );
    }

    signOut(): void {
        this.authenticatedCustomer$.next(undefined);
    }
}
