import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HelloFreshState } from '@core/store/recipe/hello-fresh.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ColruytState } from '@core/store/colruyt/colruyt.state';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import { HelloFreshService } from '@core/services/hello-fresh/hello-fresh.service';
import { CuisineState } from '@core/store/recipe/cuisines/cuisine.state';
import { HelloFreshSearchState } from '@core/store/recipe/search/search.state';
import { FavoritesState } from '@core/store/recipe/favorites/favorites.state';
import { NguCarouselModule } from '@ngu/carousel';
import { BasketState } from '@core/store/colruyt/basket/basket.state';
import { ColruytAuthInterceptor } from '@core/http/colruyt-auth.interceptor';

import { RatingModule } from 'ngx-bootstrap/rating';

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
      preventDuplicates: false,
    }),
    NguCarouselModule,
    RatingModule.forRoot(),
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
