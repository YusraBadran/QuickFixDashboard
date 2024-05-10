import { Component, OnInit } from '@angular/core';
import { Paging } from '../shared/models/paging';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { ServicesTypeService } from './service/services-type.service';
import { Filters, ItemFilters } from '../shared/models/filter';
import { StatusReturn } from '../shared/models/status';
import { TablePageEvent } from 'primeng/table';
import { TranslatesService } from '../shared/translate/translate.service';
import { map } from 'rxjs';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';
import { Permission } from '../users/model/permissions';
import { Tokens } from '../shared/models/tokens';
import { Router } from '@angular/router';
import { routes } from '../shared/router/router';

@Component({
  selector: 'app-services-type',
  templateUrl: './services-type.component.html',
})
export class ServicesTypeComponent {
  permission: Permission = new Permission();
  token = Tokens;
  rout = routes;
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  itemFilters!: Array<ItemFilters>;
  statusFilter: string = '';
  nameFilter: string = '';
  status: StatusReturn = new StatusReturn();
  page: number = 1;
  rows: number = 5;
  imageUrlApi = environment;
  tempData!: any[];
  items!: MenuItem[];
  home!: MenuItem;
  constructor(
    private httpService: BasMicroServicesApiService,
    private servicesTypeService: ServicesTypeService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private route: Router
  ) {}
  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.paging.data = temp;
  }
  /**
   * Change Table Page
   *
   * @param event
   */
  onPageChange(event: TablePageEvent) {
    this.page = event.first / event.rows + 1;
    this.rows = event.rows;
    this.getByPost();
  }

  openCreateServicesTypePopup() {
    this.servicesTypeService.showCreate();
  }
  openDetailsServicesTypePopup(Id: any) {
    this.servicesTypeService.showDetails(Id);
  }
  openUpdateServicesTypePopup(Id: any) {
    this.servicesTypeService.showUpdate(Id);
  }
  getServicesType() {
    this.httpService
      .getByPage('service_type', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.serviceType;
        this.tempData = this.paging.data;
      });
  }
  getByPost() {
    this.itemFilters = [];

    this.filter = {
      page: this.page,
      pageSize: this.rows,
      includes: [],
      filters: this.itemFilters,
      sorts: [],
    };
    this.httpService
      .getPageByPost('service_type', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.serviceType;
        this.tempData = this.paging.data;
      });
  }
  /**
   * @description delete data from table
   * @param val
   */
  async deleteBtn(Id: any) {
    if (await this.messageAlert.msgQuestion()) {
      this.httpService
        .delete('service_type', Id)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe(
          async (response) => {
            if (response.data.statusCode != undefined) {
              if (response.data.statusCode == 200) {
                if (await this.messageAlert.msgSuccess()) {
                  this.getByPost();
                }
              }
            }
          },
          (error) => {
            this.messageAlert.msgError(error.detail);
          }
        );
    }
  }
  ngOnInit(): void {
    let pagePerm = this.token.getPermissions('servicesType');
    if (pagePerm == null) {
      this.route.navigate([this.rout.baseUrl]);
    }
    this.permission = pagePerm;
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('service.serviceList'),
        },
      ];
    }, 1000);
    this.getServicesType();
    this.servicesTypeService._loadData$.subscribe((res) => {
      if (res) {
        this.getByPost();
      }
    });
  }
}
