import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-recipe-nutritions-panel',
  templateUrl: './recipe-nutritions-panel.component.html',
  styleUrls: ['./recipe-nutritions-panel.component.scss']
})
export class RecipeNutritionsPanelComponent implements OnInit {
  @Input() recipe: Recipe;

  display100g = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  for100g(amount: number) {
    const value = (amount / this.recipe.servingSize) * 100;

    if (value < 20) {
      return Math.round(value * 100) / 100;
    }

    return Math.ceil(value);
  }

}
