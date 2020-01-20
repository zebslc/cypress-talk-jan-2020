import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import HttpStatusCode from '../constants/httpStatusCode';
import { AuthenticationService } from '../services/authentication.service';
import { CustomServerErrors } from '../constants/custom-server-errors';

@Injectable({
  providedIn: 'root'
})
export class UnauthorisedErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.UNAUTHORIZED) {
          if (error.error.name === CustomServerErrors.userNotFound) {
            console.error('There was a problem with the configuration of your account. Please contact support.');
          } else {
            this.authenticationService.login();
          }

          return EMPTY;
        }
        return throwError(error);
      })
    );
  }
}
