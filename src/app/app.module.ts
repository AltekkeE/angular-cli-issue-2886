import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XSRFStrategy, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';

import { AuthenticationConnectionBackend } from './shared/security/authenticated-connection.backend';
import { CustomXSRFStrategy } from './shared/security/custom-xsrf-strategy';




@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: XSRFStrategy, useClass: CustomXSRFStrategy },
        { provide: XHRBackend, useClass: AuthenticationConnectionBackend },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
