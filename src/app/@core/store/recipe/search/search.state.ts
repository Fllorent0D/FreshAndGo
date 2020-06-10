import { Cuisine, HelloFreshSearchSuggestionsResult, Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FetchCuisinesFailure, FetchCuisinesSuccess } from '@core/store/recipe/cuisines/cuisines.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { SearchRecipe, SearchRecipeFailure, SearchRecipeSuccess } from '@core/store/recipe/search/search.actions';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';

export interface HelloFreshSearchStateModel {
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  results: Recipe[] | null;
}

@State<HelloFreshSearchStateModel>({
  name: 'search',
  defaults: {
    isFailure: false,
    isSuccess: false,
    isLoading: false,
    results: null,
  },
})
@Injectable()
export class HelloFreshSearchState {
  constructor(private helloFreshService: HelloFreshService) {}

  @Action(SearchRecipe)
  search(ctx: StateContext<HelloFreshSearchStateModel>, action: SearchRecipe) {
    ctx.setState({
      isFailure: false,
      isLoading: true,
      isSuccess: false,
      results: null,
    });
    return this.helloFreshService.searchRecipes(action.term).pipe(
      switchMap((result: Recipe[]) => ctx.dispatch(new SearchRecipeSuccess(result))),
      catchError(() => ctx.dispatch(new SearchRecipeFailure()))
    );
  }

  @Action(SearchRecipeSuccess)
  searchSuccess(ctx: StateContext<HelloFreshSearchStateModel>, action: SearchRecipeSuccess) {
    ctx.setState({
      isFailure: false,
      isLoading: false,
      isSuccess: true,
      results: action.searchResult,
    });
  }

  @Action(SearchRecipeFailure)
  searchFailure(ctx: StateContext<HelloFreshSearchStateModel>) {
    ctx.setState({
      isSuccess: false,
      isLoading: false,
      isFailure: true,
      results: null,
    });
  }
}
