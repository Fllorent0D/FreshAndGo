import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@app/@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-hello-fresh-recipe-card',
  templateUrl: './hello-fresh-recipe-card.component.html',
  styleUrls: ['./hello-fresh-recipe-card.component.scss'],
})
export class HelloFreshRecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;

  @Output() cardClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  get totalkcal() {
    return this.recipe.nutrition.find((nut) => nut.type === '57b42a48b7e8697d4b305304').amount;
  }
  getPrepTime() {
    return this.recipe.prepTime.match(/[0-9]+/) + ' minutes';
  }
}
