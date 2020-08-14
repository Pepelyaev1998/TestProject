var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { User } from './user';
import { LoginService } from './login.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
        this.user = new User();
    }
    LoginComponent.prototype.login = function () {
        this.loginService.login(this.user);
    };
    LoginComponent.prototype.logout = function () {
        this.loginService.logout;
    };
    Object.defineProperty(LoginComponent.prototype, "logIn", {
        get: function () {
            return this.loginService.isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        Component({
            selector: 'login',
            templateUrl: './login.component.html',
            providers: [LoginService]
        }),
        __metadata("design:paramtypes", [LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map