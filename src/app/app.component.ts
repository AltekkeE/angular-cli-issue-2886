import { Component } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'test-app',
    template: `
        <test-header></test-header>
        <router-outlet></router-outlet>
        <simple-notifications [options]="options" (onCreate)="onCreate($event)" (onDestroy)="onDestroy($event)"></simple-notifications>
    `,
})
export class AppComponent {

    public options = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStacks: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: false,
        rtl: false,
        animate: 'scale',
        position: ['right', 'bottom']
    };

    title = 'Test Tour of Heroes';

    constructor (private _toast: NotificationsService) {

    }

    onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }



}
