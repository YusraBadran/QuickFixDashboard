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
import { MenuItem } from 'primeng/api';
import { ScreenPermission } from '../model/screen-permissions';
import { Permission } from '../model/permissions';
import { CreatePermission } from '../model/create-permissions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  screen: any = ScreenPermission;
  screenPermissions: CreatePermission[] = [];
  rout = routes;
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  phone: any;
  items!: MenuItem[];
  submitLode: boolean = false;
  home!: MenuItem;
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
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('setting.users.title'),
          routerLink: this.rout.users,
        },
        {
          label: this.translate.getTranslate('public.create'),
        },
      ];
      this.state = this.translate.getTranslate(
        this.status.getStatusName(StatusEnum.Active)
      );
      this.states = [
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Active)
        ),
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Inactive)
        ),
      ];
    }, 1000);
  }
  addPermission(event: any) {
    var data = this.screenPermissions.filter(
      (x) => x.hashName != event.hashName
    );
    if (event.isView == true) {
      this.screen.filter((x: any) => {
        if (
          x.menu == false ||
          x.isView == false ||
          x.isDetail == false ||
          x.isCreated == false ||
          x.isUpdated == false ||
          x.isDeleted == false ||
          x.isPrint == false ||
          x.isImport == false ||
          x.isExport == false
        ) {
          x.all = false;
        } else {
          x.all = true;
        }
      });
      var addScreen = {
        hashName: event.hashName,
        menu: event.menu,
        isView: event.isView,
        isDetail: event.isDeleted,
        isCreated: event.isCreated,
        isUpdated: event.isUpdated,
        isDeleted: event.isDeleted,
        isPrint: event.isPrint,
        isImport: event.isImport,
        isExport: event.isExport,
      };
      data.push(addScreen);
      console.log(data);
    }
    if (event.isView == false) {
      event.menu = event.isView;
      event.isDetail = event.isView;
      event.isCreated = event.isView;
      event.isUpdated = event.isView;
      event.isDeleted = event.isView;
      event.isPrint = event.isView;
      event.isImport = event.isView;
      event.isExport = event.isView;
      event.all = event.isView;
    }
    this.screenPermissions = data;
  }
  addAllPermissionToScreen(event: any, screen: any) {
    let data = this.screenPermissions.filter(
      (x) => x.hashName != screen.hashName
    );
    screen.menu = event;
    screen.isView = event;
    screen.isDetail = event;
    screen.isCreated = event;
    screen.isUpdated = event;
    screen.isDeleted = event;
    screen.isPrint = event;
    screen.isImport = event;
    screen.isExport = event;
    if (event == true) {
      var addScreen = {
        hashName: screen.hashName,
        menu: screen.menu,
        isView: screen.isView,
        isDetail: screen.isDetail,
        isCreated: screen.isCreated,
        isUpdated: screen.isUpdated,
        isDeleted: screen.isDeleted,
        isPrint: screen.isPrint,
        isImport: screen.isImport,
        isExport: screen.isExport,
      };
      data.push(addScreen);
      console.log(data);
    }
    this.screenPermissions = data;
  }
  createUser() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.userName &&
      this.user.email &&
      this.phone &&
      this.state &&
      this.user.password &&
      this.user.confirmPassword
    ) {
      this.user.phoneNumber = this.phone.toString();
      if (this.screenPermissions.length > 0 || this.screenPermissions != null) {
        this.user.permissions = this.screenPermissions;

        this.user.userState = this.status.getStatusNumber(this.state);
        this.submitLode = true;
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
              this.submitLode = false;
              this.routs.navigate([this.rout.users]);
            }
          });
      }
    }
    this.submitted = true;
  }

  onSubmit(): void {}
}
