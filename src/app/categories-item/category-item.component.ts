import { Component, OnInit, Input } from '@angular/core';
import { Paging } from '../shared/models/paging';
import { Filters, ItemFilters } from '../shared/models/filter';
import { environment } from 'src/environments/environment';
import { StatusReturn } from '../shared/models/status';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { ServiceCategoriesItem } from './service/categories-item.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { TablePageEvent } from 'primeng/table';
import { map } from 'rxjs';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
})
export class CategoryItemComponent {
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
    private serviceCategoriesItem: ServiceCategoriesItem,
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

  openCreateCategoriesItemPopup() {
    this.serviceCategoriesItem.showCreate();
  }
  openDetailsCategoriesItemPopup(Id: any) {
    this.serviceCategoriesItem.showDetails(Id);
  }
  openUpdateCategoriesItemPopup(Id: any) {
    this.serviceCategoriesItem.showUpdate(Id);
  }

  getCategoryItem() {
    this.httpService
      .getByPage('category_item', 1, 5)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.category_item;
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
      .getPageByPost('category_item', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.category_item;
        this.tempData = this.paging.data;
      });
  }

  async deleteBtn(Id: any) {
    if (await this.messageAlert.msgQuestion()) {
      this.httpService
        .delete('category_item', Id)
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
    this.getCategoryItem();
    this.serviceCategoriesItem._loadData$.subscribe((res) => {
      if (res) {
        console.log('load data');

        this.getByPost();
      }
    });
  }
}
