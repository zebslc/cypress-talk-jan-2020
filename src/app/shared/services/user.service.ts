import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import _ from 'lodash';

import { IUser } from '../models/IUser';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: IUser;
  cacheChecked = false;

  private baseUrl: string;
  private cacheKey = 'currentUser';

  constructor(
    private permissionsService: NgxPermissionsService,
    private http: HttpClient,
    appService: AppConfigService
  ) {
    this.baseUrl = appService.getAppSettings().apiServer.user;
  }

  async load(): Promise<void> {

    const userCall = this.http.get<IUser>(`${this.baseUrl}user/1`);

    await userCall
      .toPromise()
      .catch(() => {
        localStorage.clear();
      })
      .then(user => {
        const userToCache = user as IUser;
        this.setSessionUser(userToCache);
      });
  }

  getCurrentUser(): IUser {
    return this.currentUser;
  }

  userHasPermission = (permissionToCheck: string): boolean =>
    _.includes(this.currentUser.permissions, permissionToCheck)

  // private setCurrentUserFromSession(): void {
  //   this.currentUser = this.getSessionUser();
  //   if (this.currentUserIsDefined()) {
  //     this.setPermissions();
  //   } else {
  //     this.currentUser = null;
  //   }
  // }

  // private currentUserIsDefined = (): boolean => (typeof this.currentUser !== 'undefined') || false;

  // private getSessionUser(): IUser {
  //   const storageResult = localStorage.getItem(this.cacheKey);

  //   return typeof storageResult !== 'undefined' && storageResult ? this.getParsedUser(storageResult) : null;
  // }

  private setSessionUser = (user: IUser) => {
    if (typeof user === 'undefined') {
      return;
    }

    this.currentUser = user;
    this.setPermissions();
    localStorage.setItem(this.cacheKey, JSON.stringify(user));
  }

  private setPermissions = () =>
    this.permissionsService.addPermission(this.currentUser && this.currentUser.permissions)
}
