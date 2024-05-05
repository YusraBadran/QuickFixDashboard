import { Component, OnInit } from '@angular/core';
import { Paging } from '../shared/models/paging';
import { Filters, ItemFilters } from '../shared/models/filter';
import { routes } from '../shared/router/router';
import { StatusReturn } from '../shared/models/status';
import { environment } from 'src/environments/environment';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { map } from 'rxjs';
import { TablePageEvent } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Permission } from '../users/model/permissions';
import { Tokens } from '../shared/models/tokens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
})
export class CenterComponent {
  permission: Permission = new Permission();
  token = Tokens;
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  rout = routes;
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
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private route: Router
  ) {}
  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
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
  getCenters() {
    this.httpService
      .getByPage('centers', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.center;
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
      .getPageByPost('centers', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.center;
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
        .delete('centers', Id)
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
    let pagePerm = this.token.getPermissions('centers');
    if (pagePerm == null) {
      this.route.navigate([this.rout.baseUrl]);
    }
    this.permission = pagePerm;
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('center.centerList'),
        },
      ];
    }, 1000);
    this.getCenters();
  }
}
