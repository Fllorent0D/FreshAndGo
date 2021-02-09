import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-recipe-steps-panel',
  templateUrl: './recipe-steps-panel.component.html',
  styleUrls: ['./recipe-steps-panel.component.scss'],
})
export class RecipeStepsPanelComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
