import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { map } from 'rxjs';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { Order } from 'src/app/orders/model/order';
import { Orders } from 'src/app/orders/model/orders';

import { updateOrderStatus } from 'src/app/orders/model/updateOrderStatus';
import { Filters, ItemFilters } from 'src/app/shared/models/filter';
import { Paging } from 'src/app/shared/models/paging';
import { StatusReturn } from 'src/app/shared/models/status';
import { Tokens } from 'src/app/shared/models/tokens';
import { routes } from 'src/app/shared/router/router';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { Permission } from 'src/app/users/model/permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  tempData!: any[];
  page: number = 1;
  rows: number = 5;
  token = Tokens;
  rout = routes;
  items!: MenuItem[];
  home!: MenuItem;
  permission: Permission = new Permission();
  itemFilters!: Array<ItemFilters>;
  status: StatusReturn = new StatusReturn();
  updateOrder: updateOrderStatus = new updateOrderStatus();
  order: Order = new Order();

  constructor(
    private httpService: BasMicroServicesApiService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private route: Router
  ) {}

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return (
        d.fullNameUser.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        d.totalPrice.toString().indexOf(val) !== -1 ||
        d.date.toString().indexOf(val) !== -1 ||
        d.status.toString().indexOf(val) !== -1 ||
        !val
      );
    });
    this.paging.data = temp;
  }

  onPageChange(event: TablePageEvent) {
    this.page = event.first / event.rows + 1;
    this.rows = event.rows;
    this.getByPost();
  }

  getByPost() {
    this.itemFilters = [];
    this.itemFilters.push({
      fieldName: 'status',
      comparision: '==',
      fieldValue: '7',
    });
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
    this.getByPost();
  }
}
