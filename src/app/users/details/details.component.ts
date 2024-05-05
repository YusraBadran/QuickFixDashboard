import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { routes } from 'src/app/shared/router/router';
import { users } from '../model/users';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  rout = routes;
  state: any;
  user: users = new users();
  status: StatusReturn = new StatusReturn();
  id!: string;
  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private route: ActivatedRoute,
    private routed: Router
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
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.user.userState)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('setting.users.title'),
          routerLink: this.rout.users,
        },
        {
          label: this.translate.getTranslate('public.details'),
        },
      ];
    }, 1000);
    this.getById(this.id);
  }

  onSubmit(): void {}
}
