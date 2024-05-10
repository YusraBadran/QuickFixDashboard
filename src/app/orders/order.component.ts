import { Component, OnInit } from '@angular/core';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { Router } from '@angular/router';
import { Permission } from '../users/model/permissions';
import { Tokens } from '../shared/models/tokens';
import { routes } from '../shared/router/router';
import { Paging } from '../shared/models/paging';
import { Filters, ItemFilters } from '../shared/models/filter';
import { StatusReturn } from '../shared/models/status';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { map } from 'rxjs';
import { Orders } from './model/orders';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
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
  order: Orders = new Orders();

  constructor(
    private httpService: BasMicroServicesApiService,
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

  getOrders() {
    this.httpService
      .getByPage('orders', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.order;
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
      .getPageByPost('orders', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.order;
        this.tempData = this.paging.data;
      });
  }

  ngOnInit() {
    let pagePerm = this.token.getPermissions('orders');
    if (pagePerm == null) {
      this.route.navigate([this.rout.baseUrl]);
    }
    this.permission = pagePerm;
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('order.orderList'),
        },
      ];
    }, 1000);
    this.getOrders();
  }
}
