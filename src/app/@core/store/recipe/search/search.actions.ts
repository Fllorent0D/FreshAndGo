import { HelloFreshSearchSuggestionsResult, Recipe } from '@core/services/hello-fresh/hello-fresh.models';

export class SearchRecipe {
  static readonly type = '[Search] Search term';

  constructor(public term: string) {}
}

export class SearchRecipeSuccess {
  static readonly type = '[Search] Search term success';

  constructor(public searchResult: Recipe[]) {}
}

export class SearchRecipeFailure {
  static readonly type = '[Search] Search term failure';
}
