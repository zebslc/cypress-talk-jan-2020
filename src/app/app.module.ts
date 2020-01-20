import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './shared/services/app-config.service';
import { EnvironmentService } from './shared/services/environment.service';
import { AppInsightsService } from '@markpieszak/ng-application-insights';
import { AppInsightsErrorHandler } from './shared/handlers/error.handler';
import { AppRoutes } from './app.routes';
import {
  httpRequestInterceptorProviders,
  httpResponseInterceptorProviders
} from './shared/interceptors/httpInterceptors';
import { UserService } from './shared/services/user.service';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './shared/services/authentication.service';
import { NgxPermissionsService, NgxPermissionsModule } from 'ngx-permissions';

export function configurationServiceInitializerFactory(
  configurationService: AppConfigService
  // tslint:disable-next-line:ban-types
): Function {
  return () => configurationService.load();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes, { enableTracing: false }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    EnvironmentService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configurationServiceInitializerFactory,
      deps: [AppConfigService, EnvironmentService, HttpClient],
      multi: true
    },
    httpRequestInterceptorProviders,
    httpResponseInterceptorProviders,
    UserService,
    AppInsightsService,
    {
      provide: ErrorHandler,
      useClass: AppInsightsErrorHandler
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
