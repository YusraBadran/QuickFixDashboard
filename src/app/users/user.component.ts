import { Component, OnInit } from '@angular/core';
import { Paging } from '../shared/models/paging';
import { Filters, ItemFilters } from '../shared/models/filter';
import { StatusReturn } from '../shared/models/status';
import { environment } from 'src/environments/environment';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { TablePageEvent } from 'primeng/table';
import { map } from 'rxjs';
import { routes } from '../shared/router/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
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
  constructor(
    private httpService: BasMicroServicesApiService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService
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

  getUsers() {
    this.httpService
      .getByPage('user', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.users;
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
      .getPageByPost('user', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.users;
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
        .delete('user', Id)
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
    this.getUsers();
  }
}
