import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceCategoriesItem } from '../service/categories-item.service';
import { map } from 'rxjs';
import { createCategoriesItemRequest } from '../model/create-Requst';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  categoriesItem: createCategoriesItemRequest =
    new createCategoriesItemRequest();
  status: StatusReturn = new StatusReturn();
  categoryLookup: any;
  categoryLookupValue = {} as any;
  option: any[] = [];
  optionValue: any = {} as any;
  constructor(
    private createCategoriesItem: ServiceCategoriesItem,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.state = this.translate.getTranslate(
        this.status.getStatusName(StatusEnum.Active)
      );
      this.states = [
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Active)
        ),
        this.translate.getTranslate(
          this.status.getStatusName(StatusEnum.Unactive)
        ),
      ];
      this.option = [
        { name: this.translate.getTranslate('public.yes'), value: true },
        { name: this.translate.getTranslate('public.no'), value: false },
      ];
      this.optionValue = {
        name: this.translate.getTranslate('public.yes'),
        value: true,
      };
    }, 1000);
    this.getCategoryLookup();
  }
  getCategoryLookup() {
    this.httpService
      .lookup('category')
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.categoryLookup = response;
      });
  }
  getIog(event: any) {
    this.categoriesItem.image = event;
  }
  closePopup() {
    this.createCategoriesItem.close();
  }
  createCatgories() {
    if (
      this.categoriesItem.name &&
      this.categoriesItem.price &&
      this.categoriesItem.description &&
      this.state
    ) {
      this.categoriesItem.status = this.status.getStatusNumber(this.state);
      if (
        this.categoryLookupValue &&
        this.categoryLookupValue != null &&
        this.categoryLookupValue != undefined
      ) {
        this.categoriesItem.categoryId = this.categoryLookupValue.id;
      }
      this.httpService
        .create('category_item', this.categoriesItem)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.createCategoriesItem.onClose();
          }
        });
    }
    this.submitted = true;
  }
}
