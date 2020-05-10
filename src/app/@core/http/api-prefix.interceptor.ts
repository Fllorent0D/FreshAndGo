import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Store } from '@ngxs/store';
import { ColruytState, ColruytStateModel } from '@core/store/colruyt/colruyt.state';
import { HelloFreshState, HelloFreshStateModel } from '@core/store/recipe/hello-fresh.state';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.colruytGW) > -1) {
      const state: ColruytStateModel = this.store.selectSnapshot(ColruytState);
      if (state.token) {
        request = request.clone({ url: request.url + '&oAuth=' + state.token });
      }
    }
    if (request.url.indexOf(environment.helloFreshGW) > -1) {
      const state: HelloFreshStateModel = this.store.selectSnapshot(HelloFreshState);
      if (state.token) {
        request = request.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${state.token}`
          })
        });
      }
    }

    return next.handle(request);
  }
}
