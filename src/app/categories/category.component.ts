import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../shared/services/alert-message.service';
import { TranslatesService } from '../shared/translate/translate.service';
import { ServiceCategories } from './service/categories.service';
import { BasMicroServicesApiService } from '../micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { StatusReturn } from '../shared/models/status';
import { Filters, ItemFilters } from '../shared/models/filter';
import { Paging } from '../shared/models/paging';
import { map } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  paging: Paging = new Paging();
  filter: Filters = new Filters();
  itemFilters!: Array<ItemFilters>;
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
    if (
      this.statusFilter != null ||
      this.statusFilter != undefined ||
      this.statusFilter != ''
    ) {
      this.itemFilters.push({
        fieldName: 'status',
        comparision: '==',
        fieldValue: this.status.getStatusNumber(this.statusFilter).toString(),
      });
    }
    if (
      this.nameFilter != null ||
      this.nameFilter != undefined ||
      this.nameFilter != ''
    ) {
      this.itemFilters.push({
        fieldName: 'name',
        comparision: 'Contains',
        fieldValue: this.nameFilter,
      });
    }

    this.httpService
      .getPageByPost('category', this.page, this.rows, this.filter)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.paging = response.categories;
        this.tempData = this.paging.data;
      });
  }

  ngOnInit(): void {
    this.getCategory();
    this.serviceCategories._loadData$.subscribe((res) => {
      if (res) {
        this.getByPost();
      }
    });
  }
}
