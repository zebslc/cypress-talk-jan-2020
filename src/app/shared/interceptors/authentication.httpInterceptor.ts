import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authenticationService.getAuthenticationToken())
      .pipe(switchMap(token => {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        return next.handle(req);
      }));
  }
}
