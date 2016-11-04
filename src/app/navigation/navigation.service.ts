import { Injectable } from '@angular/core';

import { Observable }     from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { RouteIdentifier } from './route-identifier.enum';

@Injectable()
export class NavigationService {

    private activeRoute: BehaviorSubject<RouteIdentifier> = new BehaviorSubject(null);

    public setRoute(route: RouteIdentifier) {
        this.activeRoute.next(route);
    }

    public getActiveRoute (): Observable<RouteIdentifier> {
        return new Observable<RouteIdentifier>(fn => {
            this.activeRoute.subscribe(fn);
        }
        );
    }

}
