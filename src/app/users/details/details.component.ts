import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { routes } from 'src/app/shared/router/router';
import { users } from '../model/users';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
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
    private route: ActivatedRoute
  ) {}
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

  addPermission() {}
  addAllPermissionToScreen() {}

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

  onSubmit(): void {}
}
