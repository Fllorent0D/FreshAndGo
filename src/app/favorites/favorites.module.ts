import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRecipePageComponent } from './favorites-recipe-page/favorites-recipe-page.component';
import { FavoritesRoutingModule } from '@app/favorites/favorites-routing.module';

@NgModule({
  declarations: [FavoritesRecipePageComponent],
  imports: [CommonModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
