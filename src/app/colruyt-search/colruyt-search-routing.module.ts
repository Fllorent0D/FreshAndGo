import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { AuthenticationGuard } from '@app/auth';
import { ColruytSearchComponent } from '@app/colruyt-search/components/colruyt-search/colruyt-search.component';
import { ColruytSearchPageComponent } from '@app/colruyt-search/containers/colruyt-search-page/colruyt-search-page.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/cogo', pathMatch: 'full' },
    {
      path: 'cogo',
      component: ColruytSearchPageComponent,
      canActivate: [AuthenticationGuard],
      data: { title: extract('Colruyt') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ColruytSearchRoutingModule {
}
