import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, IngredientReference } from '@core/services/hello-fresh/hello-fresh.models';
import { SearchHelloFreshIngredient } from '@app/recipe/models/recipe.models';

@Component({
  selector: 'app-ingredients-list-item',
  templateUrl: './ingredients-list-item.component.html',
  styleUrls: ['./ingredients-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsListItemComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() ingredientYieldReference: IngredientReference;

  @Output() searchIngredient: EventEmitter<SearchHelloFreshIngredient> = new EventEmitter<SearchHelloFreshIngredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  search() {
    this.searchIngredient.emit({
      ingredient: this.ingredient,
      yieldReference: this.ingredientYieldReference
    });
  }

}
