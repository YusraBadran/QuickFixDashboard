import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesItem } from '../model/categories-item';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { ServiceCategoriesItem } from '../service/categories-item.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  categoriesItem: CategoriesItem = new CategoriesItem();
  status: StatusReturn = new StatusReturn();
  serviceTypeValue: any;
  categoryLookup: any;
  categoryLookupValue: any;
  option: any[] = [];
  optionValue: any;
  id!: string;
  constructor(
    private detailCategories: ServiceCategoriesItem,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  closePopup() {
    this.detailCategories.close();
  }

  getById(id: string) {
    this.httpService
      .getById('category_item', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.categoriesItem = response.categoryItem;
        console.log(this.categoriesItem);
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.categoriesItem.status)
        );
        this.categoryLookup = this.translate.getTranslate(
          this.status.getStatusName(this.categoriesItem.status)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.detailCategories.Id;
    setTimeout(() => {
      this.states = [
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Active)
        ),
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Unactive)
        ),
      ];
    }, 1000);
    this.getById(this.id);
  }
}
