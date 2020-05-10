import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

export class FetchTokenHelloFresh {
  static readonly type = '[HelloFresh] Fetch token';
}

export class FetchRecipesHelloFresh {
  static readonly type = '[HelloFresh] Fetch recipes';
}

export class FetchMoreDetailsRecipeHelloFresh {
  static readonly type = '[HelloFresh] Fetch detailed recipe';
  constructor(public recipe: Recipe) {}
}

export class SetActiveRecipe {
  static readonly type = '[HelloFresh] Set active recipes';
  constructor(public recipe: Recipe) {}
}
