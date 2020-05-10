import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  FetchMoreDetailsRecipeHelloFresh,
  FetchRecipesHelloFresh,
  FetchTokenHelloFresh,
  SetActiveRecipe
} from '@core/store/recipe/hello-fresh.actions';
import { tap } from 'rxjs/operators';
import { ColruytLoginSuccess, ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';

export interface HelloFreshStateModel {
  token: string | null;
  recipes: Recipe[];
  activeRecipe: string | null;
}

@State<HelloFreshStateModel>({
  name: 'hellofresh',
  defaults: {
    token: null,
    activeRecipe: null,
    recipes: []
  }
})
@Injectable()
export class HelloFreshState implements NgxsOnInit {
  @Selector()
  static recipes(state: HelloFreshStateModel) {
    return state.recipes;
  }

  @Selector()
  static activeRecipe(state: HelloFreshStateModel) {
    return state.recipes.find((recipe) => recipe.id === state.activeRecipe);
  }

  constructor(private helloFreshService: HelloFreshService) {
  }

  ngxsOnInit(ctx: StateContext<HelloFreshStateModel>) {
    const state = ctx.getState();
    if (state.recipes.length === 0) {
      ctx.dispatch(new FetchRecipesHelloFresh());
    }
  }

  @Action([FetchTokenHelloFresh, ColruytLoginSuccess])
  fetchToken(ctx: StateContext<HelloFreshStateModel>) {
    return this.helloFreshService.fetchToken().pipe(
      tap((token) => {
          ctx.setState({
            ...ctx.getState(),
            token
          });
          ctx.dispatch(new FetchRecipesHelloFresh());
        }
      )
    );
  }

  @Action(FetchRecipesHelloFresh)
  fetchRecipes(ctx: StateContext<HelloFreshStateModel>) {
    return this.helloFreshService.fetchWeeklyRecipes().pipe(
      tap((recipes) => {
        console.log(recipes);
        const state = ctx.getState();
        ctx.setState({
          ...state,
          recipes
        });
      })
    );
  }

  @Action(SetActiveRecipe)
  setActiveRecipe(ctx: StateContext<HelloFreshStateModel>, action: SetActiveRecipe) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeRecipe: action.recipe.id
    });
    if (action.recipe.ingredients.length === 0) {
      ctx.dispatch(new FetchMoreDetailsRecipeHelloFresh(action.recipe));
    }
  }

  @Action(FetchMoreDetailsRecipeHelloFresh)
  fetchMoreDetailsRecipe(ctx: StateContext<HelloFreshStateModel>, action: FetchMoreDetailsRecipeHelloFresh) {
    return this.helloFreshService.fetchRecipe(action.recipe.id).pipe(
      tap((detailedRecipe) => {
        const state = ctx.getState();
        const recipes = state.recipes.map((recipe) => {
          if (recipe.id === detailedRecipe.id) {
            return detailedRecipe;
          }
          return recipe;
        });
        ctx.setState({
          ...state,
          recipes
        });
      })
    );
  }

  @Action(ColruytLogout)
  logout(ctx: StateContext<HelloFreshStateModel>) {
    ctx.setState({
      activeRecipe: null,
      recipes: [],
      token: null
    });
  }
}
