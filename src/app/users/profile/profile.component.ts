import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/router/router';
import { users } from '../model/users';
import { StatusReturn } from 'src/app/shared/models/status';
import { MenuItem } from 'primeng/api';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Tokens } from 'src/app/shared/models/tokens';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  rout = routes;
  token = Tokens;
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
    this.id = this.token.UserId;
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('menu.setting.profile'),
        },
        // routerLink: this.rout.users,
        // {
        //   label: this.translate.getTranslate('public.details'),
        // },
      ];
    }, 1000);
    this.getById(this.id);
  }

  onSubmit(): void {}
}
