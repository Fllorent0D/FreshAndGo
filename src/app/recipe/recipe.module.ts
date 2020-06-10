import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './containers/recipe/recipe.component';
import { RecipeRoutingModule } from '@app/recipe/recipe-routing.module';
import { SharedModule } from '@shared';
import { SearchRecipePageComponent } from '@app/recipe/containers/search-recipe-page/search-recipe-page.component';
import { SearchRecipeInputComponent } from '@app/recipe/components/search-recipe-input/search-recipe-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NguCarouselModule } from '@ngu/carousel';
import { RecipeTitlePanelComponent } from './components/recipe-title-panel/recipe-title-panel.component';
import { RecipeIngredientsPanelComponent } from './components/recipe-ingredients-panel/recipe-ingredients-panel.component';
import { RecipeNutritionsPanelComponent } from './components/recipe-nutritions-panel/recipe-nutritions-panel.component';
import { RecipeUstencilsPanelComponent } from './components/recipe-ustencils-panel/recipe-ustencils-panel.component';
import { RecipeStepsPanelComponent } from './components/recipe-steps-panel/recipe-steps-panel.component';
import { IngredientsListComponent } from './components/recipe-ingredients-panel/ingredients-list/ingredients-list.component';
import { IngredientsListItemComponent } from './components/recipe-ingredients-panel/ingredients-list/ingredients-list-item/ingredients-list-item.component';
import { PeopleInputComponent } from './components/recipe-ingredients-panel/people-input/people-input.component';

@NgModule({
  declarations: [
    RecipeComponent,
    SearchRecipePageComponent,
    SearchRecipeInputComponent,
    RecipeTitlePanelComponent,
    RecipeIngredientsPanelComponent,
    RecipeNutritionsPanelComponent,
    RecipeUstencilsPanelComponent,
    RecipeStepsPanelComponent,
    IngredientsListComponent,
    IngredientsListItemComponent,
    PeopleInputComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgxSkeletonLoaderModule,
    TypeaheadModule.forRoot(),
    NguCarouselModule]
})
export class RecipeModule {
}
