import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  public get() {
    console.log(this.appConfigService.appSettings.apiServer.products);

    return this.httpClient.get(
      this.appConfigService.appSettings.apiServer.products
    );
  }
}
