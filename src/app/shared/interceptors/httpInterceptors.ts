import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationHttpInterceptor } from './authentication.httpInterceptor';
import { UnauthorisedErrorInterceptor } from './unauthorised.errorInterceptor';

/** Http request interceptor providers in run in the order provided */
export const httpRequestInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationHttpInterceptor,
        multi: true
    }
];

/** Http response interceptor providers in run in the *reverse* order provided */
export const httpResponseInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorisedErrorInterceptor,
        multi: true
    }
];
