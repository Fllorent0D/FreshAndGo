import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { HelloFreshRecipeListComponent } from './hello-fresh-recipe-list/hello-fresh-recipe-list.component';
import { HelloFreshRecipeIngredientsListComponent } from './hello-fresh-recipe-ingredients-list/hello-fresh-recipe-ingredients-list.component';
import { ColruytSearchComponent } from './colruyt-search/colruyt-search.component';
import { ColruytAddToBasketComponent } from './colruyt-search/colruyt-add-to-basket/colruyt-add-to-basket.component';
import { ColruytSearchItemComponent } from './colruyt-search/colruyt-search-item/colruyt-search-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, HomeRoutingModule, ReactiveFormsModule],
  declarations: [HomeComponent, HelloFreshRecipeListComponent, HelloFreshRecipeIngredientsListComponent, ColruytSearchComponent, ColruytAddToBasketComponent, ColruytSearchItemComponent],
})
export class HomeModule {}
