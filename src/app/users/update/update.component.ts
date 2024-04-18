import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { UserService } from '../service/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  screen: any[] = [];
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
