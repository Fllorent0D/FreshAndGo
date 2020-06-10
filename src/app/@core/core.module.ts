import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HelloFreshState } from '@core/store/recipe/hello-fresh.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ColruytState } from '@core/store/colruyt/colruyt.state';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CuisineState } from '@core/store/recipe/cuisines/cuisine.state';
import { HelloFreshSearchState } from '@core/store/recipe/search/search.state';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FavoritesState } from '@core/store/recipe/favorites/favorites.state';
import { NguCarouselModule } from '@ngu/carousel';
import { BasketState } from '@core/store/colruyt/basket/basket.state';
import { ColruytAuthInterceptor } from '@core/http/colruyt-auth.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    NgxsModule.forRoot(
      [HelloFreshState, CuisineState, ColruytState, HelloFreshSearchState, FavoritesState, BasketState],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NguCarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ColruytAuthInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    ColruytService,
    HelloFreshService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
