import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

export class AddRecipeInFavorite {
  static readonly type = '[Favorite] Add favorite';

  constructor(public recipe: Recipe) {}
}

export class RemoveRecipeFromFavorite {
  static readonly type = '[Favorite] Remove favorite';

  constructor(public recipe: Recipe) {}
}

export class ToggleRecipeFromFavorite {
  static readonly type = '[Favorite] Toggle favorite';

  constructor(public recipe: Recipe) {}
}
