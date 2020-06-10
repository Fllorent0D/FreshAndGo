import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Ingredient, Recipe, Yield } from '@core/services/hello-fresh/hello-fresh.models';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from '@core';
import { startWith } from 'rxjs/operators';
import { SearchHelloFreshIngredient } from '@app/recipe/models/recipe.models';

@Component({
  selector: 'app-recipe-ingredients-panel',
  templateUrl: './recipe-ingredients-panel.component.html',
  styleUrls: ['./recipe-ingredients-panel.component.scss']
})
export class RecipeIngredientsPanelComponent implements OnInit, OnDestroy {

  @Input() recipe: Recipe;
  @Output() searchIngredient: EventEmitter<SearchHelloFreshIngredient> = new EventEmitter<SearchHelloFreshIngredient>();

  peopleFormControl: FormControl;
  yield: Yield;

  ngOnInit(): void {
    this.peopleFormControl = new FormControl({ value: 2 });
    this.peopleFormControl.valueChanges.pipe(
      untilDestroyed(this),
      startWith(2)
    ).subscribe(this.setYield.bind(this));
  }

  ngOnDestroy() {
  }

  setYield(people: number) {
    this.yield = this.recipe.yields.find(y => y.yields === people);
  }

  get minimumYield(): number {
    return this.recipe.yields.find(y => y.yields === Math.min(...this.recipe.yields.map(yy => yy.yields))).yields;
  }

  get maximumYield(): number {
    return this.recipe.yields.find(y => y.yields === Math.max(...this.recipe.yields.map(yy => yy.yields))).yields;
  }

  get shippedIngredient(): Ingredient[] {
    return this.recipe.ingredients?.filter((i) => i.shipped);
  }

  get notShippedIngredient(): Ingredient[] {
    return this.recipe.ingredients?.filter((i) => !i.shipped);
  }


}
