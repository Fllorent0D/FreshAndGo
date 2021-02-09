import { ColruytShowBasket } from '@core/services/colruyt/colruyt.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ColruytLoginSuccess } from '@core/store/colruyt/colruyt.action';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import {
  ColruytAddToBasket,
  ColruytAddToBasketFailure,
  ColruytAddToBasketSuccess,
  ColruytClearBasket,
  ColruytClearBasketSuccess,
  ColruytRefreshBasket,
  ColruytRemoveFromBasket,
  ColruytRemoveFromBasketFailure,
  ColruytRemoveFromBasketSuccess,
} from '@core/store/colruyt/basket/basket.action';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private colruytService: ColruytService, private toastr: ToastrService) {}

  @Action([
    ColruytRefreshBasket,
    ColruytLoginSuccess,
    ColruytAddToBasketSuccess,
    ColruytClearBasketSuccess,
    ColruytRemoveFromBasketSuccess,
  ])
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
    return this.colruytService.addToBasket(action.item.id, action.unit, action.quantity, action.comment).pipe(
      switchMap((resposnse) => ctx.dispatch(new ColruytAddToBasketSuccess(resposnse, action.item))),
      catchError(() => ctx.dispatch(new ColruytAddToBasketFailure()))
    );
  }

  @Action([ColruytAddToBasketSuccess])
  productAdded(ctx: StateContext<BasketStateModel>, action: ColruytAddToBasketSuccess) {
    this.toastr.success(
      `Prix ${action.addToBasketResponse.lineTotalPrice}€`,
      action.colruytSearchItem.description + ' ajouté au panier!'
    );
  }

  @Action([ColruytRemoveFromBasket])
  removeFromBasket(ctx: StateContext<BasketStateModel>, action: ColruytRemoveFromBasket) {
    return this.colruytService.removeFromBasket(action.itemsIds).pipe(
      switchMap(() => ctx.dispatch(new ColruytRemoveFromBasketSuccess())),
      catchError(() => ctx.dispatch(new ColruytRemoveFromBasketFailure()))
    );
  }

  @Action([ColruytClearBasket])
  clearBasket(ctx: StateContext<BasketStateModel>) {
    return this.colruytService.clearBasket().pipe(switchMap(() => ctx.dispatch(new ColruytClearBasketSuccess())));
  }
}
