import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ColruytState, ColruytStateModel } from '@core/store/colruyt/colruyt.state';
import { Store } from '@ngxs/store';
import { ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { get } from 'lodash';

@Injectable()
export class ColruytAuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((res) => {
      console.log(res);
      if (request.url.indexOf(environment.colruytGW) > -1) {
        if (get(res, 'body.status.code') === 3) {
          this.store.dispatch(new ColruytLogout(true));
          console.log('Colruyt logout');
        }
        console.log('Colruyt end request', res);
      }
    }));
  }
}
