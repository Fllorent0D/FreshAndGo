import { Action, createSelector, State, StateContext } from '@ngxs/store';
import {
  AddRecipeInFavorite,
  RemoveRecipeFromFavorite,
  ToggleRecipeFromFavorite,
} from '@core/store/recipe/favorites/favorite.actions';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface FavoriteRecipesStateModel {
  ids: string[];
}

@State<FavoriteRecipesStateModel>({
  name: 'favorites',
  defaults: {
    ids: [],
  },
})
@Injectable()
export class FavoritesState {
  static isRecipeInFavorites(id: string) {
    return createSelector([FavoritesState], (state: FavoriteRecipesStateModel) => state.ids.includes(id));
  }

  @Action(AddRecipeInFavorite)
  addToFavorite(ctx: StateContext<FavoriteRecipesStateModel>, action: AddRecipeInFavorite) {
    const recipe = action.recipe;
    const ids = [...ctx.getState().ids];

    if (!ids.find((id) => id === recipe.id)) {
      ids.push(recipe.id);
    }

    ctx.patchState({ ids });
  }

  @Action(RemoveRecipeFromFavorite)
  removeFromRecipe(ctx: StateContext<FavoriteRecipesStateModel>, action: RemoveRecipeFromFavorite) {
    const recipe = action.recipe;
    const ids = Array.from(ctx.getState().ids).filter((id) => id !== recipe.id);

    return ctx.patchState({ ids });
  }

  @Action(ToggleRecipeFromFavorite)
  toggleRecipe(ctx: StateContext<FavoriteRecipesStateModel>, action: ToggleRecipeFromFavorite) {
    const recipe = action.recipe;
    if (ctx.getState().ids.includes(recipe.id)) {
      return ctx.dispatch(new RemoveRecipeFromFavorite(recipe));
    } else {
      return ctx.dispatch(new AddRecipeInFavorite(recipe));
    }
  }
}
