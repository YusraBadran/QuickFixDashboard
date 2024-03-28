import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { ServiceCategories } from './service/categories.service';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { StatusReturn } from '../shared/models/status';
import { Filters, ItemFilters } from '../shared/models/filter';
import { Paging } from '../shared/models/paging';
import { map } from 'rxjs';
import { TablePageEvent } from 'primeng/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  itemFilters!: Array<ItemFilters>;
  imageUrlApi = environment;
  statusFilter: string = '';
  nameFilter: string = '';
  status: StatusReturn = new StatusReturn();
  page: number = 1;
  rows: number = 5;
  tempData!: any[];

  constructor(
    private httpService: BasMicroServicesApiService,
    private serviceCategories: ServiceCategories,
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
  onPageChange(event: TablePageEvent) {
    this.page = event.first / event.rows + 1;
    this.rows = event.rows;
    this.getByPost();
  }

  openCreateCategoriesPopup() {
    this.serviceCategories.showCreate();
  }
  openDetailsCategoriesPopup(Id: any) {
    this.serviceCategories.showDetails(Id);
  }
  openUpdateCategoriesPopup(Id: any) {
    this.serviceCategories.showUpdate(Id);
  }

  getCategory() {
    this.httpService
      .getByPage('category', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.category;
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
      .getPageByPost('category', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.category;
        this.tempData = this.paging.data;
      });
  }

  async deleteBtn(Id: any) {
    if (await this.messageAlert.msgQuestion()) {
      this.httpService
        .delete('category', Id)
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
    this.getCategory();
    this.serviceCategories._loadData$.subscribe((res) => {
      if (res) {
        console.log('load data');

        this.getByPost();
      }
    });
  }
}
