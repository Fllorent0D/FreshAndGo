import { Ingredient, IngredientReference } from '@core/services/hello-fresh/hello-fresh.models';

export interface SearchHelloFreshIngredient {
  ingredient: Ingredient;
  yieldReference: IngredientReference;
}
