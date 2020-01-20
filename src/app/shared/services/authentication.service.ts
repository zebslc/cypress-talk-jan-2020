import { Injectable } from '@angular/core';

// import { UserAgentApplication } from 'msal';

import { AppConfigService } from './app-config.service';
import { UserAgentApplicationFactoryService } from '../factories/user-agent-application-factory.service';
import { AppInsightsService } from '@markpieszak/ng-application-insights';
import { IAppConfig } from '../IAppConfig';

@Injectable()
export class AuthenticationService {

  private settings: IAppConfig;

  // private clientApplication: UserAgentApplication;

  constructor(
    private appConfigService: AppConfigService,
    private userAgentApplicationFactory: UserAgentApplicationFactoryService,
    private appInsightsService: AppInsightsService) {
    this.settings = this.appConfigService.getAppSettings();

    // this.clientApplication = this.userAgentApplicationFactory.create();
  }

  public login(): void {
    // this.clientApplication.loginRedirect(this.settings.aad.b2cScopes);
  }

  public logout(): void {
    localStorage.clear();
    this.clearSavedState();
    // this.clientApplication.logout();
  }

  private clearSavedState() {
    localStorage.removeItem('@@STATE');
  }

  public getAuthenticationToken(): Promise<string> {
    return Promise.resolve('');
    // return this.clientApplication.acquireTokenSilent(this.settings.aad.b2cScopes)
    //   .then(token => {
    //     return token;
    //   }).catch(error => {
    //     this.appInsightsService.trackException(error);
    //     return Promise.resolve('');
    //   });
  }
}
