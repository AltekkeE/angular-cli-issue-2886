import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XSRFStrategy } from '@angular/http';

import { AppComponent } from './app.component';

import { CustomXSRFStrategy } from './custom-xsrf-strategy';




@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: XSRFStrategy, useClass: CustomXSRFStrategy },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
