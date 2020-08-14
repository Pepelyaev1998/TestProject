import { Component } from '@angular/core';
import { User } from './user';
import { LoginService } from './login.service';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [LoginService]
})
export class LoginComponent {
    token: any;
    user: User = new User();
    receivedUser: User;
    constructor(private loginService: LoginService) { }
    login() {
        this.loginService.login(this.user)
    }
    logout() {
        this.loginService.logout
    }

    public get logIn(): boolean {
        return this.loginService.isAuthenticated
    }
}