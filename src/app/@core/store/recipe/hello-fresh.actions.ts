import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { RecipeCategory } from '@core/store/recipe/hello-fresh.state';

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
export class FetchRecipe {
  static readonly type = '[HelloFresh] fetch recipe';

  constructor(public recipeId: string) {}
}
export class SaveRecipes {
  static readonly type = '[HelloFresh] save recipe';

  constructor(public recipes: Recipe[]) {}
}

export class FetchRecipeFailure {
  static readonly type = '[HelloFresh] fetch recipe failure';

  constructor(public recipeId: string) {}
}

export class FetchRecipesForCategory {
  static readonly type = '[HelloFresh] fetch more recipes for category';

  constructor(public category: RecipeCategory, public page: number) {}
}

export class FetchRecipesForCategorySuccess {
  static readonly type = '[HelloFresh] fetch more recipes for category success';

  constructor(
    public category: RecipeCategory,
    public page: number,
    public totalPages: number,
    public recipes: Recipe[]
  ) {}
}
