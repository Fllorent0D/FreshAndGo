import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColruytSearchComponent } from '@app/colruyt-search/components/colruyt-search/colruyt-search.component';
import { ColruytAddToBasketComponent } from '@app/colruyt-search/components/colruyt-add-to-basket/colruyt-add-to-basket.component';
import { ColruytSearchItemComponent } from '@app/colruyt-search/components/colruyt-search-item/colruyt-search-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ColruytSearchRoutingModule } from '@app/colruyt-search/colruyt-search-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColruytSearchPageComponent } from './containers/colruyt-search-page/colruyt-search-page.component';
import { ColruytSearchModalComponent } from './containers/colruyt-search-modal/colruyt-search-modal.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    ColruytSearchComponent,
    ColruytAddToBasketComponent,
    ColruytSearchItemComponent,
    ColruytSearchPageComponent,
    ColruytSearchModalComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    ColruytSearchRoutingModule,
    ModalModule.forRoot(),
    LazyLoadImageModule,
  ],
  entryComponents: [ColruytSearchModalComponent],
})
export class ColruytSearchModule {}
