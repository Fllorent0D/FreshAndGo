import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-hello-fresh-recipe-list',
  templateUrl: './hello-fresh-recipe-list.component.html',
  styleUrls: ['./hello-fresh-recipe-list.component.scss'],
})
export class HelloFreshRecipeListComponent implements OnInit {
  @Input() recipes: Recipe[];
  @Input() activeRecipe: Recipe;
  @Output() recipeClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  isFavorite = false;

  constructor() {}

  ngOnInit(): void {}
}
