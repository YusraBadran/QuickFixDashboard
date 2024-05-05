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
import { MenuItem } from 'primeng/api';
import { Permission } from '../model/permissions';
import { ScreenPermission } from '../model/screen-permissions';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
})
export class UpdateComponent {
  screen: any[] = ScreenPermission;
  permissions: Permission[] = [];
  rout = routes;
  submitted: boolean = false;
  submitLode: boolean = false;
  states: any[] = [];
  state: any;
  phone: any;
  user: users = new users();
  status: StatusReturn = new StatusReturn();
  id!: string;
  items!: MenuItem[];
  home!: MenuItem;
  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private routs: Router,
    private route: ActivatedRoute
  ) {}
  addPermission(event: any) {
    var data = this.permissions.filter((x) => x.hashName != event.hashName);
    if (event.isView == true) {
      this.screen.filter((x) => {
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
        id: event.id,
        hashName: event.hashName,
        menu: event.menu,
        isView: event.isView,
        isDetail: event.isDetail,
        isCreated: event.isCreated,
        isUpdated: event.isUpdated,
        isDeleted: event.isDeleted,
        isPrint: event.isPrint,
        isImport: event.isImport,
        isExport: event.isExport,
      };
      data.push(addScreen);
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
    this.permissions = data;
  }
  addAllPermissionToScreen(event: any, screen: any) {
    let data = this.permissions.filter((x) => x.hashName != screen.hashName);
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
        id: screen.id,
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
    this.permissions = data;
  }
  updateUser() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.userName &&
      this.user.email &&
      this.phone &&
      this.state &&
      (this.permissions.length > 0 || this.permissions != null)
    ) {
      this.user.permissions = this.permissions;
      console.log(this.user.permissions);
      console.log(this.permissions);
      this.user.phoneNumber = this.phone.toString();
      this.user.userState = this.status.getStatusNumber(this.state);
      this.submitLode = true;
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
            this.submitLode = false;
            this.routs.navigate([this.rout.usersDetails + this.user.id]);
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
        this.phone = this.user.phoneNumber;
        if (this.user.permissions.length > 0) {
          this.screen.forEach((x) => {
            this.user.permissions.filter((y) => {
              if (x.hashName == y.hashName) {
                x.id = y.id;
                x.isView = y.isView;
                x.menu = y.menu;
                x.isDetail = y.isDetail;
                x.isCreated = y.isCreated;
                x.isUpdated = y.isUpdated;
                x.isDeleted = y.isDeleted;
                x.isPrint = y.isPrint;
                x.isImport = y.isImport;
                x.isExport = y.isExport;
                this.permissions.push(x);
              }
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
          });
        }
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.user.userState)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById(this.id);
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('setting.users.title'),
          routerLink: this.rout.users,
        },
        {
          label: this.translate.getTranslate('public.update'),
        },
      ];
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

  onSubmit(): void {}
}
