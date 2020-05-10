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
import { HelloFreshRecipeDetailsComponent } from './hello-fresh-recipe-details/hello-fresh-recipe-details.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    HelloFreshRecipeListComponent,
    HelloFreshRecipeIngredientsListComponent,
    ColruytSearchComponent,
    ColruytAddToBasketComponent,
    ColruytSearchItemComponent,
    HelloFreshRecipeDetailsComponent
  ],
  entryComponents: [ColruytSearchComponent]
})
export class HomeModule {
}
