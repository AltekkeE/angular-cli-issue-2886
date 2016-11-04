import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../navigation/navigation.service';

@Component({
    selector: 'test-dashboard',
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

    constructor (private navigationService: NavigationService) {

    }

    public ngOnInit() {
        this.navigationService.setRoute(null);
    }
}
