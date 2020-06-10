import { Action, State, StateContext } from '@ngxs/store';
import { AddRecipeInFavorite, RemoveRecipeFromFavorite } from '@core/store/recipe/favorites/favorite.actions';
import { Injectable } from '@angular/core';

export interface FavoriteRecipesStateModel {
  ids: string[];
}

@State<FavoriteRecipesStateModel>({
  name: 'favorites',
  defaults: {
    ids: []
  }
})
@Injectable()
export class FavoritesState {
  @Action(AddRecipeInFavorite)
  addToFavorite(ctx: StateContext<FavoriteRecipesStateModel>, action: AddRecipeInFavorite) {
    const recipe = action.recipe;
    const ids = Array.from(ctx.getState().ids || []);

    if (!ids.find((id) => id === recipe.id)) {
      ids.push(recipe.id);
    }

    ctx.patchState({ ids });
  }

  @Action(RemoveRecipeFromFavorite)
  removeFromRecipe(ctx: StateContext<FavoriteRecipesStateModel>, action: RemoveRecipeFromFavorite) {
    const recipe = action.recipe;
    const ids = Array.from(ctx.getState().ids).filter((id) => id !== recipe.id);

    ctx.setState({ ids });
  }
}
