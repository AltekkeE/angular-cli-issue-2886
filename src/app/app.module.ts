import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XSRFStrategy, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { routing } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { AuthenticationConnectionBackend } from './shared/security/authenticated-connection.backend';
import { CustomXSRFStrategy } from './shared/security/custom-xsrf-strategy';
import { MyRequestOptions } from './shared/security/request-options';
import { ApplicationRouteGuardService } from './shared/security/application-route-guard.service';

import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './navigation/navigation.service';



@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        SharedModule,
        SimpleNotificationsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        NavigationComponent,
        HeaderComponent,
    ],
    providers: [
        ApplicationRouteGuardService,
        NavigationService,
        { provide: XSRFStrategy, useClass: CustomXSRFStrategy },
        { provide: XHRBackend, useClass: AuthenticationConnectionBackend },
        { provide: RequestOptions, useClass: MyRequestOptions},
        NotificationsService,
    ],
    exports: [SharedModule],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
