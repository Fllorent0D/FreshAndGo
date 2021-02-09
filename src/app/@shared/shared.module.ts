import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { CuisineItemComponent } from './cuisine-list/cuisine-item/cuisine-item.component';
import { CuisineItemSkeletonComponent } from './cuisine-list/cuisine-item-skeleton/cuisine-item-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HelloFreshRecipeCardComponent } from './hello-fresh-recipe-card/hello-fresh-recipe-card.component';
import { HelloFreshRecipeSliderComponent } from './hello-fresh-recipe-slider/hello-fresh-recipe-slider.component';
import { NguCarouselModule } from '@ngu/carousel';
import { UnitPipe } from './unit-pipe/unit.pipe';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    NgxSkeletonLoaderModule,
    NguCarouselModule,
    RatingModule,
    FormsModule,
    LazyLoadImageModule,
  ],
  declarations: [
    LoaderComponent,
    CuisineListComponent,
    CuisineItemComponent,
    CuisineItemSkeletonComponent,
    HelloFreshRecipeCardComponent,
    HelloFreshRecipeSliderComponent,
    UnitPipe,
  ],
  providers: [BsModalService],
  exports: [
    LoaderComponent,
    NgxUiLoaderModule,
    CuisineListComponent,
    HelloFreshRecipeCardComponent,
    HelloFreshRecipeSliderComponent,
    UnitPipe,
  ],
})
export class SharedModule {}
