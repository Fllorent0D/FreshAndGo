import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-hello-fresh-recipe-ingredients-list',
  templateUrl: './hello-fresh-recipe-ingredients-list.component.html',
  styleUrls: ['./hello-fresh-recipe-ingredients-list.component.scss'],
})
export class HelloFreshRecipeIngredientsListComponent implements OnInit {
  @Input() activeRecipe: Recipe;

  get shippedIngredients(): Ingredient[] {
    return this.activeRecipe.ingredients.filter((ing) => ing.shipped);
  }

  @Input() activeIngredient: Ingredient;
  @Output() ingredientsClicked: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  getYieldsIngredient(ingredient: Ingredient, person: number) {
    return this.activeRecipe.yields
      .find((y) => y.yields === person)
      .ingredients.find((ing) => ing.id === ingredient.id);
  }
}
