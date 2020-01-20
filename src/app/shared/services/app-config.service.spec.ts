import { TestBed, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

import { AppConfigService } from './app-config.service';
import { IAppConfig } from '../IAppConfig';
import { EnvironmentService } from './environment.service';

describe('AppConfigService', () => {
    const mockEnvironment = 'mockEnvironment';
    const testUrl = `assets/config/config.${mockEnvironment}.json`;
    let appConfigService: AppConfigService;
    let httpTestingController: HttpTestingController;
    let injector: TestBed;
    const expectedSettings: IAppConfig = {
        env: {
            name: mockEnvironment
        },
        aad: {
            tenant: 'tenant',
            clientId: 'clientid',
            signUpSignInPolicy: 'signup',
            passwordResetPolicy: 'passwordreset',
            b2cScopes: ['b2c']
        },
        apiServer: {
          user: 'user'
        }
    } as IAppConfig;

    const mockEnvironmentService = {
        environmentName: mockEnvironment
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule],
            providers: [
                AppConfigService,
                { provide: EnvironmentService, useValue: mockEnvironmentService }
            ]
        });
        injector = getTestBed();
        httpTestingController = injector.get(HttpTestingController);
        appConfigService = injector.get(AppConfigService);

    });

    describe('#getAppConfig', () => {
        it('should call expected settings', fakeAsync(() => {
            const testData: IAppConfig = expectedSettings;

            appConfigService.load();

            httpTestingController
                .expectOne((request) => request.url.startsWith(testUrl) && request.method === 'GET', 'did not make http call to get config')
                .flush(testData);

            tick();

            httpTestingController.verify();
            expect(appConfigService.getAppSettings()).toEqual(expectedSettings);

        }));

        it('should call not get settings if they are already present', () => {
            const testData: IAppConfig = expectedSettings;
            appConfigService.appSettings = testData;
            appConfigService.loaded = true;
            appConfigService.load();
            httpTestingController.expectNone(
                (request) => request.url.startsWith(testUrl) && request.method === 'GET', 'should not have called the data');

            expect(appConfigService.getAppSettings().apiServer.user).toEqual(testData.apiServer.user);
        });

        it('should error if settings are not set', () => {
            expect(() => { appConfigService.getAppSettings(); })
                .toThrowError('AppConfig is not loaded');
        });
    });
});
