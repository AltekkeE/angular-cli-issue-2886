import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Router }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class AuthenticationConnectionBackend extends XHRBackend {

    constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy, private router: Router) {
        super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
    }

    createConnection(request: Request) {
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error: Response) => {
            console.log(error.status);
            if (error.status === 401 || error.status === 403 || error.status === 901) {
                console.log('The authentication session expired or the user is not authorized.');
            }
            return Observable.throw(error);
        });
        return xhrConnection;
    }

}
