var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { LoginService } from './login.service';
var TechniqueGuard = /** @class */ (function () {
    function TechniqueGuard(auth) {
        this.auth = auth;
    }
    TechniqueGuard.prototype.canActivate = function () {
        return this.auth.isAuthenticated;
    };
    TechniqueGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoginService])
    ], TechniqueGuard);
    return TechniqueGuard;
}());
export { TechniqueGuard };
//# sourceMappingURL=technique.guard.js.map