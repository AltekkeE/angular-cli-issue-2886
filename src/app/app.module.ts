import { BrowserModule } from '@angular/platform-browser';
import { XSRFStrategy } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CustomXSRFStrategy } from './custom-xsrf-strategy';
@NgModule({
  declarations: [
    AppComponent
  ],
    providers: [
        { provide: XSRFStrategy, useClass: CustomXSRFStrategy },
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
