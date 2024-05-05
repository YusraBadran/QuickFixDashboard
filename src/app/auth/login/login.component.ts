import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { Tokens } from 'src/app/shared/models/tokens';
import { routes } from 'src/app/shared/router/router';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { LogInRequest } from './model/login_request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public routes = routes;
  public loginRequest: LogInRequest = new LogInRequest();
  public submitted = false;
  private token = Tokens;
  constructor(
    private apiService: BasMicroServicesApiService,
    private _router: Router,
    public translate: TranslatesService // private identity: ServiceService // private _router: Router
  ) {}
  @HostListener('window:keydown.enter')
  public submit(): void {
    if (this.loginRequest.userNameOrEmail && this.loginRequest.password) {
      console.log(this.loginRequest);

      this.apiService.login('identity', this.loginRequest).subscribe({
        next: (response: any) => {
          console.log(response);

          if (response.statusCode === 200) {
            this.token.setToken(response.data.accessToken);
            this.token.setMenu(response.data.menu);
            this.token.setPermissions(response.data.permissions);
            this._router.navigate([routes.baseUrl]);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.submitted = true;
  }
}
