import { XSRFStrategy, Request } from '@angular/http';

import { csrfToken } from '../main';

export class CustomXSRFStrategy implements XSRFStrategy {

    configureRequest(req: Request) {
        console.log(csrfToken);
    }
}
