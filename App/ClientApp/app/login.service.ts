import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    private url = "/api/users";
    receivedToken = '';
    constructor(private http: HttpClient, private router: Router) {
    }

    login(user: User) {

        const body = { email: user.email, password: user.password };
        console.log("1");
        this.http.post(this.url, body).subscribe(data => {
            this.receivedToken = data["access_token"]; if (this.receivedToken == '') {
                this.router.navigate(['/login']);
            }
            else { this.router.navigate(['/technique']); sessionStorage.setItem('auth_token', this.receivedToken); }
        },
            error => console.log(error));
    }
    logout() {
        sessionStorage.removeItem('auth_token');
        this.router.navigate(['/login'])
    }

    public get isAuthenticated(): boolean {
        return (sessionStorage.getItem('auth_token') !== null);
    }

}