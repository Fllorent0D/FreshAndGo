import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ColruytState, ColruytStateModel } from '@core/store/colruyt/colruyt.state';
import { Store } from '@ngxs/store';
import { ColruytLogin, ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { get } from 'lodash';

@Injectable()
export class ColruytAuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      switchMap((res) => {
        if (request.url.indexOf(environment.colruytGW) > -1) {
          // Colruyt request
          if (get(res, 'body.status.code') === 3) {
            // Access issue
            // Refresh token and replay request
            const state: ColruytStateModel = this.store.selectSnapshot(ColruytState);
            return this.store
              .dispatch(new ColruytLogin(state.username, state.password))
              .pipe(switchMap(() => next.handle(request)));
          }
        }
        return of(res);
      })
    );
  }
}
