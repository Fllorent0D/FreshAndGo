import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Logger } from '@core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;

  ngOnInit() {}

  ngOnDestroy() {}
}
