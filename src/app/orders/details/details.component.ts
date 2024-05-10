import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { routes } from 'src/app/shared/router/router';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { Orders } from '../model/orders';
import { StatusReturn } from 'src/app/shared/models/status';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { Paging } from 'src/app/shared/models/paging';
import { Filters, ItemFilters } from 'src/app/shared/models/filter';
import { Order } from '../model/order';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  rout = routes;
  state: any;
  status: StatusReturn = new StatusReturn();
  order: Order = new Order();
  id!: string;
  items!: MenuItem[];
  home!: MenuItem;
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  itemFilters!: Array<ItemFilters>;
  statusFilter: string = '';
  nameFilter: string = '';
  page: number = 1;
  rows: number = 5;
  tempData!: any[];

  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private route: ActivatedRoute,
    private routed: Router
  ) {}

  getById(id: string) {
    this.httpService
      .getById('orders', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.order = response.order;
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.order.status)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('orders'),
          routerLink: this.rout.orders,
        },
        {
          label: this.translate.getTranslate('public.details'),
        },
      ];
    }, 1000);
    this.getById(this.id);
  }

  // onSubmit(): void {}
}
