import { EnvironmentService } from './environment.service';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

import { IAppConfig } from '../IAppConfig';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    appSettings: IAppConfig;
    configUrl: string;
    private readonly http: HttpClient;
    loaded = false;

    constructor(
        private environmentService: EnvironmentService,
        handler: HttpBackend
    ) {
        this.http = new HttpClient(handler);
        this.configUrl = `assets/config/config.${this.environmentService.environmentName}.json`;
    }

    load(): Promise<IAppConfig> {
        if (this.loaded) {
            return of(this.appSettings).toPromise();
        } else {
            const headers = new HttpHeaders({
                'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                Pragma: 'no-cache',
                Expires: '0'
            });

            const settings = this.http.get<IAppConfig>(this.configUrl + '?t=' + new Date().getTime(), { headers });

            return settings
                .toPromise()
                .then(config => {
                    this.appSettings = config as IAppConfig;
                    this.loaded = true;
                    return this.appSettings;
                });
        }
    }

    getAppSettings(): IAppConfig {
        if (!this.appSettings) {
            throw new ReferenceError('AppConfig is not loaded');
        }

        return this.appSettings;
    }
}
