import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { Select, Store } from '@ngxs/store';
import { ColruytState } from '@core/store/colruyt/colruyt.state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketState, BasketStateModel } from '@core/store/colruyt/basket/basket.state';
import { untilDestroyed } from '@core';
import { map } from 'rxjs/operators';
import { ColruytShowBasket } from '@core/services/colruyt/colruyt.model';
import { AppSidebarComponent } from '@coreui/angular';
import { AsideToggleDirective } from '@coreui/angular/lib/shared/layout/layout.directive';
import { ClassToggler } from '@coreui/angular/lib/shared/toggle-classes';
import { DOCUMENT } from '@angular/common';
import { ColruytClearBasket } from '@core/store/colruyt/basket/basket.action';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  colorScheme: string;
  basket$: Observable<ColruytShowBasket>;
  @Select(BasketState.basketSize) basketSize$: Observable<number>;

  @ViewChild('aside') asideBar: AppSidebarComponent;

  display = false;

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.darkLightTheme();
    this.basket$ = this.store.select(BasketState).pipe(
      untilDestroyed(this),
      map((basketState: BasketStateModel) => basketState.basket)
    );
  }

  darkLightTheme() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
      // this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'c-dark-theme' : 'legacy-theme';
    } else {
      // If the browser doesn't support prefers-color-scheme, set it as default to dark
      this.colorScheme = 'legacy-theme';
    }

    this.renderer.removeClass(document.body, this.colorScheme === 'c-dark-theme' ? 'legacy-theme' : 'c-dark-theme');
    this.renderer.addClass(document.body, this.colorScheme);
  }

  logout() {
    this.store.dispatch(new ColruytLogout()).subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.store.selectSnapshot(ColruytState);
    return credentials ? credentials.username : null;
  }

  toggleTheme() {
    this.renderer.removeClass(document.body, 'legacy-theme');
    this.renderer.removeClass(document.body, 'c-dark-theme');
    this.colorScheme = this.colorScheme === 'c-dark-theme' ? 'legacy-theme' : 'c-dark-theme';
    this.renderer.addClass(document.body, this.colorScheme);
  }

  ngOnDestroy(): void {}

  clicked() {
    this.document.body.classList.remove('aside-menu-show');
  }

  clearBasket() {
    this.store.dispatch(new ColruytClearBasket());
  }
}
