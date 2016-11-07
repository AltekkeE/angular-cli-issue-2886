import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

// Export csrf token results so that app can import it
export var csrfToken = {"token":"dec8e94e-8e14-4713-b6b1-2767608550f7","parameterName":"_csrf","headerName":"X-XSRF-TOKEN"};

// Boostrap the app
platformBrowserDynamic().bootstrapModule(AppModule);
