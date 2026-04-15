import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";

export const authChildGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isSignedIn.pipe(
        map(isSignedIn => {
            if (isSignedIn) {
                return true;
            } else {
                return router.createUrlTree(['/sign-in']);
            }
        })
    );
};
