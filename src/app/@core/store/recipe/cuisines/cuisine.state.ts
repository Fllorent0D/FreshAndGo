import { Cuisine } from '@core/services/hello-fresh/hello-fresh.models';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  FetchCuisines,
  FetchCuisinesFailure,
  FetchCuisinesSuccess,
} from '@core/store/recipe/cuisines/cuisines.actions';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';

export interface CuisineStateModel {
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  elements: Cuisine[];
}

@State<CuisineStateModel>({
  name: 'cuisines',
  defaults: {
    isFailure: false,
    isSuccess: false,
    isLoading: false,
    elements: [],
  },
})
@Injectable()
export class CuisineState {
  constructor(private helloFreshService: HelloFreshService) {}

  @Action(FetchCuisines)
  fetchCuisines(ctx: StateContext<CuisineStateModel>) {
    ctx.setState({
      isFailure: false,
      isLoading: true,
      isSuccess: false,
      elements: [],
    });
    return this.helloFreshService.fetchCuisines().pipe(
      switchMap((cuisines: Cuisine[]) => ctx.dispatch(new FetchCuisinesSuccess(cuisines))),
      catchError(() => ctx.dispatch(new FetchCuisinesFailure()))
    );
  }

  @Action(FetchCuisinesSuccess)
  fetchCuisinesSuccess(ctx: StateContext<CuisineStateModel>, action: FetchCuisinesSuccess) {
    ctx.setState({
      isFailure: false,
      isLoading: false,
      isSuccess: true,
      elements: action.cuisines,
    });
  }

  @Action(FetchCuisinesFailure)
  fetchCuisinesFailure(ctx: StateContext<CuisineStateModel>) {
    ctx.setState({
      isSuccess: false,
      isLoading: false,
      isFailure: true,
      elements: [],
    });
  }
}
