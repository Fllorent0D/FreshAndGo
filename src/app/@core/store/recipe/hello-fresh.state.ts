import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  FetchMoreDetailsRecipeHelloFresh,
  FetchMoreRecipesForCategory,
  FetchMoreRecipesForCategorySuccess,
  FetchRecipe,
  FetchRecipeFailure,
  FetchRecipesHelloFresh,
  FetchTokenHelloFresh,
  SaveRecipes,
  SetActiveRecipe,
} from '@core/store/recipe/hello-fresh.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ColruytLoginSuccess, ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';
import { CuisineState } from '@core/store/recipe/cuisines/cuisine.state';
import { FetchCuisines } from '@core/store/recipe/cuisines/cuisines.actions';
import { HelloFreshSearchState } from '@core/store/recipe/search/search.state';
import { Observable, of } from 'rxjs';
import { cloneDeep } from 'lodash';
import { FavoritesState } from '@core/store/recipe/favorites/favorites.state';

export enum RecipeCategory {
  QUICK = 'quick',
  POPULAR = 'popular',
  NEW = 'new',
}

export interface RecipePage {
  items: string[];
  isLoading: boolean;
}

export interface RecipePagination {
  [category: string]: {
    pages: {
      [page: number]: RecipePage;
    };
    currentPage: number;
  };
}

export interface HelloFreshStateModel {
  token: string | null;
  recipes: Recipe[];
  entities: { [key: string]: Recipe };
  activeRecipe: string | null;
  pagination: RecipePagination;
}

@State<HelloFreshStateModel>({
  name: 'hellofresh',
  defaults: {
    token: null,
    activeRecipe: null,
    recipes: [],
    entities: {},
    pagination: {},
  },
  children: [CuisineState, HelloFreshSearchState, FavoritesState],
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

  constructor(private helloFreshService: HelloFreshService) {}

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
        ctx.patchState({
          token,
        });
        ctx.dispatch([
          new FetchRecipesHelloFresh(),
          new FetchCuisines(),
          new FetchMoreRecipesForCategory(RecipeCategory.QUICK),
          new FetchMoreRecipesForCategory(RecipeCategory.POPULAR),
          new FetchMoreRecipesForCategory(RecipeCategory.NEW),
        ]);
      })
    );
  }

  @Action(FetchRecipesHelloFresh)
  fetchRecipes(ctx: StateContext<HelloFreshStateModel>) {
    return this.helloFreshService.fetchWeeklyRecipes().pipe(
      tap((recipes) => {
        console.log(recipes);
        ctx.patchState({
          recipes,
        });
      })
    );
  }

  @Action(FetchRecipe)
  fetchRecipe(ctx: StateContext<HelloFreshStateModel>, action: FetchRecipe) {
    return this.helloFreshService.fetchRecipe(action.recipeId).pipe(
      switchMap((recipe) => ctx.dispatch(new SaveRecipes([recipe]))),
      catchError(() => ctx.dispatch(new FetchRecipeFailure(action.recipeId)))
    );
  }

  @Action(SaveRecipes)
  saveRecipes(ctx: StateContext<HelloFreshStateModel>, { recipes }: SaveRecipes) {
    const state = ctx.getState();
    const entities = Object.assign({}, state.entities);
    for (const recipe of recipes) {
      entities[recipe.id] = recipe;
    }

    ctx.patchState({
      entities,
    });
  }

  @Action(FetchMoreRecipesForCategory)
  fetchRecipesForCategory(ctx: StateContext<HelloFreshStateModel>, action: FetchMoreRecipesForCategory) {
    const state = ctx.getState();
    const category = cloneDeep(state.pagination[action.category]) || {
      pages: {},
      currentPage: null,
    };
    const currentPage = category?.currentPage;
    const pageToLoad = currentPage ? currentPage + 1 : 0;

    let call: Observable<Recipe[]>;
    switch (action.category) {
      case RecipeCategory.NEW:
        call = this.helloFreshService.searchNewRecipes(pageToLoad);
        break;
      case RecipeCategory.POPULAR:
        call = this.helloFreshService.searchPopularRecipes(pageToLoad);
        break;
      case RecipeCategory.QUICK:
        call = this.helloFreshService.searchQuickRecipe(pageToLoad);
        break;
    }

    category.currentPage = pageToLoad;
    category.pages[pageToLoad] = {
      items: [],
      isLoading: true,
    };

    ctx.patchState({
      pagination: {
        ...state.pagination,
        [action.category]: category,
      },
    });

    return call.pipe(
      switchMap((recipes) =>
        ctx.dispatch(new FetchMoreRecipesForCategorySuccess(action.category, pageToLoad, recipes))
      ),
      catchError(() => of(null))
    );
  }

  @Action(FetchMoreRecipesForCategorySuccess)
  fetchRecipesForCategorySuccess(ctx: StateContext<HelloFreshStateModel>, action: FetchMoreRecipesForCategorySuccess) {
    const state = ctx.getState();
    const category = cloneDeep(state.pagination[action.category]);

    category.pages[action.currentPage] = {
      items: action.recipes.map((recipe) => recipe.id),
      isLoading: false,
    };

    ctx.patchState({
      pagination: {
        ...state.pagination,
        [action.category]: category,
      },
    });

    return ctx.dispatch(new SaveRecipes(action.recipes));
  }

  @Action(SetActiveRecipe)
  setActiveRecipe(ctx: StateContext<HelloFreshStateModel>, action: SetActiveRecipe) {
    const state = ctx.getState();
    ctx.patchState({
      activeRecipe: action.recipe.id,
    });
    if (!action.recipe.ingredients || action.recipe.ingredients.length === 0) {
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
        ctx.patchState({
          recipes,
        });
      })
    );
  }

  @Action(ColruytLogout)
  logout(ctx: StateContext<HelloFreshStateModel>) {
    ctx.patchState({
      activeRecipe: null,
      recipes: [],
      entities: {},
      token: null,
      pagination: {},
    });
  }
}
