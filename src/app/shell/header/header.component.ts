import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { ColruytState } from '@core/store/colruyt/colruyt.state';
import { Observable } from 'rxjs';
import { ColruytLogout } from '@core/store/colruyt/colruyt.action';
import { BasketState } from '@core/store/colruyt/basket/basket.state';

@Component({
  selector: 'app-heeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  @Select(BasketState.basketSize) basketSize: Observable<number>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.store.dispatch(new ColruytLogout()).subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.store.selectSnapshot(ColruytState);
    return credentials ? credentials.username : null;
  }
}
