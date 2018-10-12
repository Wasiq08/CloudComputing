import { CanActivate, Router } from '@angular/router';
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) {}

    canActivate(): boolean {
        
        if (this.authService.checkToken()) {
            return true;
        }
        //Redirect the user before denying them access to this route
        this.router.navigate(['/login']);
        return false;
    }
}