import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
  /* istanbul ignore next */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  environmentName: string = environment.name;
}
