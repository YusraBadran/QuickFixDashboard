import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/users.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { routes } from 'src/app/shared/router/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  screen: any[] = [];
  rout = routes;
  constructor(
    private updateUser: UserService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}
  addPermission() {}
  addAllPermissionToScreen() {}
  ngOnInit(): void {}

  onSubmit(): void {}
}
