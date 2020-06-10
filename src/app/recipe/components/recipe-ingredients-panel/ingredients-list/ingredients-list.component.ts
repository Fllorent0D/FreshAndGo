import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, IngredientReference, Yield } from '@core/services/hello-fresh/hello-fresh.models';
import { SearchHelloFreshIngredient } from '@app/recipe/models/recipe.models';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsListComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Input() yield: Yield;
  @Output() searchIngredient: EventEmitter<SearchHelloFreshIngredient> = new EventEmitter<SearchHelloFreshIngredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getYieldReference(ingredient: Ingredient): IngredientReference {
    const test = this.yield.ingredients.find((ing) => ing.id === ingredient.id);
    return test;
  }
}
