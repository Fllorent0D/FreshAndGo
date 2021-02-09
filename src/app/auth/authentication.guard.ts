import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { Store } from '@ngxs/store';
import { ColruytState } from '@core/store/colruyt/colruyt.state';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAuthenticated = this.store.selectSnapshot(ColruytState.isAuthenticated);
    if (isAuthenticated) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
