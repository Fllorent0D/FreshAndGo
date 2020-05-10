import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  ColruytLogin,
  ColruytLoginSuccess,
  ColruytLogout,
  ColruytRefreshBasket,
} from '@core/store/colruyt/colruyt.action';
import { tap } from 'rxjs/operators';
import { ColruytShowBasket } from '@core/services/colruyt/colruyt.model';
import { ColruytService } from '@core/services/colruyt/colruyt.service';

export interface ColruytStateModel {
  basket: ColruytShowBasket;
  token: string;
  username: string;
}

@State<ColruytStateModel>({
  name: 'colruyt',
  defaults: {
    basket: null,
    token: null,
    username: null,
  },
})
@Injectable()
export class ColruytState implements NgxsOnInit {
  @Selector()
  static basketSize(state: ColruytStateModel) {
    return state.basket.size;
  }

  @Selector()
  static isAuthenticated(state: ColruytStateModel) {
    return state.token;
  }

  constructor(private colruytService: ColruytService) {}

  ngxsOnInit(ctx?: StateContext<ColruytStateModel>): any {
    const state = ctx.getState();
    if (ColruytState.isAuthenticated(state)) {
      ctx.dispatch(new ColruytRefreshBasket());
    }
  }

  @Action([ColruytRefreshBasket, ColruytLoginSuccess])
  refreshBasket(ctx: StateContext<ColruytStateModel>) {
    return this.colruytService.fetchBasket().pipe(
      tap((basket) => {
        ctx.setState({
          ...ctx.getState(),
          basket,
        });
      })
    );
  }

  @Action(ColruytLogin)
  login(ctx: StateContext<ColruytStateModel>, login: ColruytLogin) {
    return this.colruytService.login(login).pipe(
      tap((oauth) => {
        ctx.setState({
          ...ctx.getState(),
          token: oauth.oAuth,
          username: login.username,
        });
        ctx.dispatch(new ColruytLoginSuccess());
      })
    );
  }

  @Action(ColruytLogout)
  logout(ctx: StateContext<ColruytStateModel>) {
    return this.colruytService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          username: null,
          basket: null,
        });
      })
    );
  }
}
