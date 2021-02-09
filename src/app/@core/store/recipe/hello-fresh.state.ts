import { Action, createSelector, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  FetchRecipe,
  FetchRecipeFailure,
  FetchRecipesForCategory,
  FetchRecipesForCategorySuccess,
  FetchRecipesHelloFresh,
  FetchTokenHelloFresh,
  SaveRecipes,
} from '@core/store/recipe/hello-fresh.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ColruytLoginSuccess, ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { HelloFreshListResponse, Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { HelloFreshService, TAKE_RECIPE_COUNT } from '@core/services/hello-fresh/hello-fresh.service';
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

export interface RecipeCategoryPages {
  pages: {
    [page: number]: RecipePage;
  };
  totalPages?: number;
}

export interface RecipePagination {
  [category: string]: RecipeCategoryPages;
}

export interface HelloFreshStateModel {
  token: string | null;
  entities: { [key: string]: Recipe };
  pagination: RecipePagination;
}

@State<HelloFreshStateModel>({
  name: 'hellofresh',
  defaults: {
    token: null,
    entities: {},
    pagination: {},
  },
  children: [CuisineState, HelloFreshSearchState, FavoritesState],
})
@Injectable()
export class HelloFreshState implements NgxsOnInit {
  static getRecipeCategory(category: RecipeCategory) {
    return createSelector([HelloFreshState], (state: HelloFreshStateModel) => {
      console.log(category);
      return state.pagination[category];
    });
  }

  static getRecipesByCategoryPerPage(category: RecipeCategory, page: number) {
    return createSelector(
      [HelloFreshState.getRecipeCategory(category), HelloFreshState],
      (cat: RecipeCategoryPages, helloFreshState: HelloFreshStateModel) => {
        console.log(category, cat);
        if (!cat || !cat.pages[page]) {
          return [];
        }

        return cat.pages[page].items.map((id) => helloFreshState.entities[id]);
      }
    );
  }

  static getCategoryPage(category: RecipeCategory, page: number) {
    return createSelector([HelloFreshState.getRecipeCategory(category)], (cat: RecipeCategoryPages) => {
      return cat.pages[page];
    });
  }

  static getRecipeById(id: string) {
    return createSelector([HelloFreshState], (state: HelloFreshStateModel) => {
      return state.entities[id];
    });
  }

  constructor(private helloFreshService: HelloFreshService) {}

  ngxsOnInit(ctx: StateContext<HelloFreshStateModel>) {
    console.log('Hello fresh state init');
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
          new FetchRecipesForCategory(RecipeCategory.QUICK, 0),
          new FetchRecipesForCategory(RecipeCategory.POPULAR, 0),
          new FetchRecipesForCategory(RecipeCategory.NEW, 0),
        ]);
      })
    );
  }

  @Action(FetchRecipe)
  fetchRecipe(ctx: StateContext<HelloFreshStateModel>, action: FetchRecipe) {
    const state = ctx.getState();

    if (state.entities[action.recipeId]) {
      return;
    }

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

  @Action(FetchRecipesForCategory)
  fetchRecipesForCategory(ctx: StateContext<HelloFreshStateModel>, action: FetchRecipesForCategory) {
    const state = ctx.getState();
    const category: RecipeCategoryPages = !!state.pagination[action.category]
      ? {
          pages: {
            ...state.pagination[action.category].pages,
          },
          totalPages: state.pagination[action.category].totalPages,
        }
      : {
          pages: {},
        };

    // TODO Change add timestamp to refresh gradually
    if (category.pages[action.page]) {
      return;
    }

    let call: Observable<HelloFreshListResponse<Recipe>>;
    switch (action.category) {
      case RecipeCategory.NEW:
        call = this.helloFreshService.searchNewRecipes(action.page);
        break;
      case RecipeCategory.POPULAR:
        call = this.helloFreshService.searchPopularRecipes(action.page);
        break;
      case RecipeCategory.QUICK:
        call = this.helloFreshService.searchQuickRecipe(action.page);
        break;
    }

    category.pages[action.page] = {
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
      switchMap((response) =>
        ctx.dispatch(
          new FetchRecipesForCategorySuccess(
            action.category,
            action.page,
            Math.ceil(response.total / TAKE_RECIPE_COUNT),
            response.items
          )
        )
      ),
      catchError(() => of(null))
    );
  }

  @Action(FetchRecipesForCategorySuccess)
  fetchRecipesForCategorySuccess(ctx: StateContext<HelloFreshStateModel>, action: FetchRecipesForCategorySuccess) {
    const state = ctx.getState();
    const category = cloneDeep(state.pagination[action.category]);

    category.pages[action.page] = {
      items: action.recipes.map((recipe) => recipe.id),
      isLoading: false,
    };
    category.totalPages = action.totalPages;

    const newEntities: { [id: string]: Recipe } = action.recipes.reduce((acc, recipe) => {
      acc[recipe.id] = recipe;
      return acc;
    }, {});

    ctx.patchState({
      pagination: {
        ...state.pagination,
        [action.category]: category,
      },
      entities: {
        ...state.entities,
        ...newEntities,
      },
    });

    return ctx.dispatch(new SaveRecipes(action.recipes));
  }

  @Action(ColruytLogout)
  logout(ctx: StateContext<HelloFreshStateModel>) {
    ctx.patchState({
      entities: {},
      token: null,
      pagination: {},
    });
  }
}
