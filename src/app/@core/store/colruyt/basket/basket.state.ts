import { ColruytShowBasket } from '@core/services/colruyt/colruyt.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ColruytLoginSuccess } from '@core/store/colruyt/colruyt.action';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import {
  ColruytAddToBasket,
  ColruytAddToBasketFailure,
  ColruytAddToBasketSuccess, ColruytClearBasket, ColruytClearBasketSuccess,
  ColruytRefreshBasket
} from '@core/store/colruyt/basket/basket.action';

export interface BasketStateModel {
  basket?: ColruytShowBasket;
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    basket: null,
  },
})
@Injectable()
export class BasketState {
  @Selector()
  static basketSize(state: BasketStateModel) {
    return state.basket.size;
  }

  constructor(private colruytService: ColruytService) {}

  @Action([ColruytRefreshBasket, ColruytLoginSuccess, ColruytAddToBasketSuccess, ColruytClearBasketSuccess])
  refreshBasket(ctx: StateContext<BasketStateModel>) {
    return this.colruytService.fetchBasket().pipe(
      tap((basket: ColruytShowBasket) => {
        ctx.patchState({
          basket,
        });
      })
    );
  }

  @Action([ColruytAddToBasket])
  addToBasket(ctx: StateContext<BasketStateModel>, action: ColruytAddToBasket) {
    return this.colruytService.addToBasket(action.itemId, action.unit, action.quantity, action.comment).pipe(
      switchMap(() => ctx.dispatch(new ColruytAddToBasketSuccess())),
      catchError(() => ctx.dispatch(new ColruytAddToBasketFailure()))
    );
  }

  @Action([ColruytClearBasket])
  clearBasket(ctx: StateContext<BasketStateModel>) {
    return this.colruytService.clearBasket().pipe(
      switchMap(() => ctx.dispatch(new ColruytClearBasketSuccess())),
    );
  }
}
