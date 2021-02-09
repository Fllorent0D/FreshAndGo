import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-recipe-ustencils-panel',
  templateUrl: './recipe-ustencils-panel.component.html',
  styleUrls: ['./recipe-ustencils-panel.component.scss'],
})
export class RecipeUstencilsPanelComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
