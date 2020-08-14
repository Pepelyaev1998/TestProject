var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TechniqueComponent } from './technique.component';
import { LoginComponent } from './login.component';
import { StartComponent } from './start.component';
import { RouterModule } from '@angular/router';
import { SearchPipe } from './search.pipe';
import { TechniqueGuard } from './technique.guard';
import { LoginService } from './login.service';
import { TokenInterceptor } from './TokenInterceptor';
var appRoutes = [
    { path: '', component: LoginComponent },
    { path: 'technique', component: TechniqueComponent, canActivate: [TechniqueGuard] },
    { path: 'login', component: LoginComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes, { useHash: true })],
            declarations: [LoginComponent, TechniqueComponent, StartComponent, SearchPipe],
            providers: [TechniqueGuard, LoginService, {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }],
            bootstrap: [StartComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map