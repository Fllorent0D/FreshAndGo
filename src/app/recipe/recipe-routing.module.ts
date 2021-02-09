import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { AuthenticationGuard } from '@app/auth';
import { SearchRecipePageComponent } from '@app/recipe/containers/search-recipe-page/search-recipe-page.component';
import { RecipeComponent } from '@app/recipe/containers/recipe/recipe.component';
import { CategoryPageComponent } from '@app/recipe/containers/category-page/category-page.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'recettes',
      component: SearchRecipePageComponent,
      canActivate: [AuthenticationGuard],
      data: { title: extract('Recettes') },
    },
    {
      path: 'recettes/categorie/:category-slug/:page',
      component: CategoryPageComponent,
      canActivate: [AuthenticationGuard],
      data: { title: extract('Catégorie') },
    },
    {
      path: 'recettes/:recipe-slug/:id',
      component: RecipeComponent,
      canActivate: [AuthenticationGuard],
      data: { title: extract('Recette') },
    },
    { path: '', redirectTo: 'recettes', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RecipeRoutingModule {}
