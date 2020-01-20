import { Injectable, ErrorHandler } from '@angular/core';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

@Injectable()
export class AppInsightsErrorHandler extends ErrorHandler {
  constructor(private appInsightsService: AppInsightsService) {
    super();
  }

  handleError(error: any): void {
    this.appInsightsService.trackException(error);
    super.handleError(error);
  }
}
