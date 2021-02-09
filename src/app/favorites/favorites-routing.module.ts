import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { AuthenticationGuard } from '@app/auth';
import { SearchRecipePageComponent } from '@app/recipe/containers/search-recipe-page/search-recipe-page.component';
import { FavoritesRecipePageComponent } from '@app/favorites/favorites-recipe-page/favorites-recipe-page.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'favorites',
      component: FavoritesRecipePageComponent,
      canActivate: [AuthenticationGuard],
      data: { title: extract('Favoris') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FavoritesRoutingModule {}
