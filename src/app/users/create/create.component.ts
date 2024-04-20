import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { routes } from 'src/app/shared/router/router';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { Createusers } from '../model/create-user';
import { map } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  screen: any[] = [];
  rout = routes;
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  user: Createusers = new Createusers();
  status: StatusReturn = new StatusReturn();
  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private routs: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.state = this.translate.getTranslate(
        this.status.getStatusName(StatusEnum.Active)
      );
      this.states = [
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Active)
        ),
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Unactive)
        ),
      ];
    }, 1000);
  }

  createUser() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.userName &&
      this.user.email &&
      this.user.phoneNumber &&
      this.state &&
      this.user.password &&
      this.user.confirmPassword
    ) {
      this.user.userState = this.status.getStatusNumber(this.state);
      this.httpService
        .create('user', this.user)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.routs.navigate([this.rout.users]);
          }
        });
    }
    this.submitted = true;
  }

  addPermission() {}
  addAllPermissionToScreen() {}

  onSubmit(): void {}
}
