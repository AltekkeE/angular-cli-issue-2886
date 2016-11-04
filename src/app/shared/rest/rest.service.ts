import { Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

export abstract class RestService {

    constructor() {

    }

    protected handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);;
    }

    protected extractData (res: Response) {
        let body = res.json();
        return body.data || {};
    }
}
