import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { RouteIdentifier } from './route-identifier.enum';



@Component({
    selector: 'header-navigation',
    templateUrl: 'navigation.component.html',
})
export class NavigationComponent implements OnInit {

    private activeRoute: RouteIdentifier;

    constructor(private navigationService: NavigationService, private router: Router) { }

    public ngOnInit(): void {
        this.navigationService.getActiveRoute().subscribe( activeRoute => this.activeRoute = activeRoute);
    }

    public adminActive(): Boolean {
        return this.activeRoute === RouteIdentifier.Admin;

    }


}
