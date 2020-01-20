import { Component } from '@angular/core';
import { AppConfigService } from './shared/services/app-config.service';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    appConfigService: AppConfigService,
    appInsightsService: AppInsightsService
  ) {
    const settings = appConfigService.getAppSettings();
    appInsightsService.config = { instrumentationKey: settings.appInsights.instrumentationKey };
    appInsightsService.init();
  }
  title = 'cypress-talk';
}
