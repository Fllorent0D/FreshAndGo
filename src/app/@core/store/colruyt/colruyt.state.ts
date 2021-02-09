import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ColruytLogin, ColruytLoginSuccess, ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { tap } from 'rxjs/operators';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import { ColruytRefreshBasket } from '@core/store/colruyt/basket/basket.action';
import { BasketState } from '@core/store/colruyt/basket/basket.state';

export interface ColruytStateModel {
  token: string;
  username: string;
  password: string; // sorry
}

@State<ColruytStateModel>({
  name: 'colruyt',
  defaults: {
    token: null,
    username: null,
    password: null,
  },
  children: [BasketState],
})
@Injectable()
export class ColruytState implements NgxsOnInit {
  @Selector()
  static isAuthenticated(state: ColruytStateModel) {
    return state.token;
  }

  constructor(private colruytService: ColruytService) {}

  ngxsOnInit(ctx?: StateContext<ColruytStateModel>): any {
    const state = ctx.getState();
    if (state.token) {
      ctx.dispatch(new ColruytRefreshBasket());
    }
  }

  @Action(ColruytLogin)
  login(ctx: StateContext<ColruytStateModel>, login: ColruytLogin) {
    return this.colruytService.login(login.username, login.password).pipe(
      tap((oauth) => {
        ctx.patchState({
          token: oauth.oAuth,
          username: login.username,
          password: login.password,
        });
        ctx.dispatch([new ColruytLoginSuccess()]);
      })
    );
  }

  @Action(ColruytLogout)
  logout(ctx: StateContext<ColruytStateModel>, action: ColruytLogout) {
    if (action.noCall) {
      return ctx.patchState({
        token: null,
        username: null,
        password: null,
      });
    } else {
      return this.colruytService.logout().pipe(
        tap(() => {
          ctx.patchState({
            token: null,
            username: null,
            password: null,
          });
        })
      );
    }
  }
}
