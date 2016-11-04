import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { Http } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Response } from '@angular/http';

import { RestService } from '../rest/rest.service';

import { AppStatus } from './app-status';

@Injectable()
export class ApplicationRouteGuardService implements CanActivate {

    private appStatus: AppStatus;
    private redirectUrl: string;
    private legacyRedirect: boolean;

    constructor (private http: Http, private router: Router) {
    }

    public getAppStatus (): Observable<AppStatus>  {
        this.appStatus = new AppStatus();
        this.appStatus.isDashboardActive = true;
        return Observable.of(this.appStatus);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let targetUrl: string = state.url;
        return this.start(targetUrl);
    }

    private start (targetUrl: string): Observable<boolean> {
        if (this.appStatus) {
            this.checkRoute(targetUrl);
            return Observable.of(this.routeActive(targetUrl));
        } else {
            return this.getAppStatus().map(appStatus => {
                this.appStatus = appStatus;
                return this.routeActive(targetUrl);
            });
        }
    }

    private routeActive (targetUrl): boolean {
        if (this.checkRoute(targetUrl)) {
            return true;
        } else {
            if (this.legacyRedirect) {
                window.location.href = this.redirectUrl;
            } else {
                this.router.navigate([this.redirectUrl]);
            }
            return false;
        }
    }

    private checkRoute (url: string) {
        let active = false;
        url = url.toLowerCase();
        this.legacyRedirect = false;

        if (url === '/' || url.indexOf('dashboard') > 0) {
            active = this.appStatus.isDashboardActive;
            this.redirectUrl = '/default';
            this.legacyRedirect = true;
        }
        return active;
    }

    private handleError(error: any) {
        return Observable.of(new AppStatus());
    }

    private extractData (res: Response) {
        let body = res.json();
        return body.data || {};
    }

}
