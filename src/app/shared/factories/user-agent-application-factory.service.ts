import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AppConfigService } from '../services/app-config.service';
import { UserService } from '../services/user.service';
import { IAppConfig } from '../IAppConfig';

@Injectable({
  providedIn: 'root'
})
export class UserAgentApplicationFactoryService {
  settings: IAppConfig;
  private authority: string;
  private passwordResetAuthority: string;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
    @Inject(DOCUMENT) private readonly document: Document) { }

  // create(): UserAgentApplication {

  //   this.settings = this.appConfigService.getAppSettings();

  //   this.configureAad();

  //   return this.createUserAgentApplication(this.authority);

  // }

  // createUserAgentApplication = (authority) => {

  //   return new UserAgentApplication(
  //     this.settings.aad.clientId,
  //     authority,
  //     this.authCallback,
  //     {
  //       storeAuthStateInCookie: true,
  //       redirectUri: this.document.location.protocol + '//' + this.document.location.host,
  //       postLogoutRedirectUri: this.document.location.protocol + '//' + this.document.location.host,
  //       cacheLocation: 'localStorage',
  //     });
  // }

  // private configureAad(): void {
  //   this.authority = `https://login.microsoftonline.com/tfp/${this.settings.aad.tenant}/${this.settings.aad.signUpSignInPolicy}`;
  //   this.passwordResetAuthority =
  //     `https://login.microsoftonline.com/tfp/${this.settings.aad.tenant}/${this.settings.aad.passwordResetPolicy}`;
  // }

  // authCallback = (errorDesc: any, token: any, error: any, tokenType: any) => {

  //   if (this.userTryingToResetPassword(token, errorDesc)) {

  //     const passResetApplication = this.createUserAgentApplication(this.passwordResetAuthority);
  //     passResetApplication.loginRedirect(this.settings.aad.b2cScopes);
  //   }
  //   if (!errorDesc) {
  //     this.cacheUserPermissions();
  //   }

  // }

  // cacheUserPermissions = () => {
  //   this.userService.load();
  // }

  // private userTryingToResetPassword(token: any, errorDesc: any) {
  //   return !token && errorDesc && errorDesc.indexOf('AADB2C90118') > -1;
  // }
}
