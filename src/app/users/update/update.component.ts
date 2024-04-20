import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { routes } from 'src/app/shared/router/router';
import { users } from '../model/users';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { map } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
})
export class UpdateComponent {
  screen: any[] = [];
  rout = routes;
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  user: users = new users();
  status: StatusReturn = new StatusReturn();
  id!: string;
  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private routs: Router,
    private route: ActivatedRoute
  ) {}

  updateUser() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.userName &&
      this.user.email &&
      this.user.phoneNumber &&
      this.state
    ) {
      this.user.userState = this.status.getStatusNumber(this.state);
      this.httpService
        .update('user', this.user)
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

  getById(id: string) {
    this.httpService
      .getById('user', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.user = response;
        console.log(this.user);

        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.user.userState)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.states = [
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Active)
        ),
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Unactive)
        ),
      ];
    }, 1000);
    this.getById(this.id);
  }

  addPermission() {}
  addAllPermissionToScreen() {}
  onSubmit(): void {}
}
