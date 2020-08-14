var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var LoginService = /** @class */ (function () {
    function LoginService(http, router) {
        this.http = http;
        this.router = router;
        this.url = "/api/users";
        this.receivedToken = '';
    }
    LoginService.prototype.login = function (user) {
        var _this = this;
        var body = { email: user.email, password: user.password };
        console.log("1");
        this.http.post(this.url, body).subscribe(function (data) {
            _this.receivedToken = data["access_token"];
            if (_this.receivedToken == '') {
                _this.router.navigate(['/login']);
            }
            else {
                _this.router.navigate(['/technique']);
                sessionStorage.setItem('auth_token', _this.receivedToken);
            }
        }, function (error) { return console.log(error); });
    };
    LoginService.prototype.logout = function () {
        sessionStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    };
    Object.defineProperty(LoginService.prototype, "isAuthenticated", {
        get: function () {
            return (sessionStorage.getItem('auth_token') !== null);
        },
        enumerable: true,
        configurable: true
    });
    LoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Router])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map