import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TechniqueComponent } from './technique.component';
import { LoginComponent } from './login.component';
import { StartComponent } from './start.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchPipe } from './search.pipe';
import { TechniqueGuard } from './technique.guard';
import { LoginService } from './login.service';
import { TokenInterceptor } from './TokenInterceptor';
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'technique', component: TechniqueComponent, canActivate: [TechniqueGuard] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes, { useHash: true })],
    declarations: [LoginComponent, TechniqueComponent, StartComponent, SearchPipe],
    providers: [TechniqueGuard, LoginService, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    bootstrap: [StartComponent]
})
export class AppModule { }