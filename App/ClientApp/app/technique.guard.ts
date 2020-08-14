import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from './login.service';
@Injectable()
export class TechniqueGuard implements CanActivate {
    constructor(public auth: LoginService) { }

    canActivate(): Observable<boolean> | boolean {
        return this.auth.isAuthenticated;
    }
}
