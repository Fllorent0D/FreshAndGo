import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-recipe-title-panel',
  templateUrl: './recipe-title-panel.component.html',
  styleUrls: ['./recipe-title-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeTitlePanelComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAllergens() {
    return this.recipe.allergens.map(al => al.name).join(', ');
  }

  getTags() {
    return this.recipe.tags.map(al => al.name);
  }

  getPrepTime() {
    return (this.recipe.prepTime.match(/[0-9]+/)) + ' minutes';
  }

  getDifficulty() {
    return this.recipe.difficulty;
  }

  favoriteClicked() {
  }
}
