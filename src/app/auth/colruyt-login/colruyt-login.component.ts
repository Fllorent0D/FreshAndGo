import { Component, OnInit } from '@angular/core';
import { ColruytLogin } from '@core/store/colruyt/colruyt.action';
import { finalize, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-colruyt-login',
  templateUrl: './colruyt-login.component.html',
  styleUrls: ['./colruyt-login.component.scss'],
})
export class ColruytLoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  emailSent = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private actions: Actions,
    private store: Store
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login() {
    this.isLoading = true;
    this.store
      .dispatch(new ColruytLogin(this.loginForm.value.username, this.loginForm.value.password))
      .pipe(
        take(1),
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials) => {
          console.log(`${credentials.username} successfully logged in`);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
