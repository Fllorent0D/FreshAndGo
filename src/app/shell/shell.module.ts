import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BasketAsideComponent } from './basket-aside/basket-aside.component';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    TabsModule.forRoot(),
    TranslateModule,
    NgbModule,
    AuthModule,
    I18nModule,
    RouterModule,
    AppFooterModule,
    AppSidebarModule,
    AppBreadcrumbModule,
    AppAsideModule,
    AppHeaderModule,
  ],
  declarations: [HeaderComponent, ShellComponent, BasketAsideComponent],
})
export class ShellModule {}
