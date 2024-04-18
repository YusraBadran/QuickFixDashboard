import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoriesItem } from '../service/categories-item.service';
import { CategoriesItem } from '../model/categories-item';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  // id: any;
  // submitted: boolean = false;
  // states: any[] = [];
  // state: any;
  // categoriesItem: CategoriesItem = new CategoriesItem();
  // status: StatusReturn = new StatusReturn();
  // serviceType: any;
  // serviceTypeValue = {} as any;
  // categoryLookup: any;
  // categoryLookupValue = {} as any;
  // option: any[] = [];
  // optionValue: any = {} as any;

  id: any;
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  categoriesItem: CategoriesItem = new CategoriesItem();
  status: StatusReturn = new StatusReturn();
  categoryLookup: any;
  categoryLookupValue = {} as any;
  option: any[] = [];
  optionValue: any = {} as any;
  constructor(
    private updateCategories: ServiceCategoriesItem,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  ngOnInit(): void {
    this.id = this.updateCategories.Id;
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
    this.getById(this.id);
    this.getCategoryLookup();
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
        this.categoriesItem = response.categoryItem;
        this.categoryLookupValue = this.categoriesItem.category;
        console.log(this.categoryLookupValue);

        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.categoriesItem.status)
        );
      });
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
    this.updateCategories.close();
  }
  updateCategoryItem() {
    if (
      this.categoriesItem.name &&
      this.categoriesItem.description &&
      this.state
    ) {
      console.log(this.categoryLookupValue);
      console.log(this.categoryLookupValue);

      this.categoriesItem.status = this.status.getStatusNumber(this.state);
      if (
        this.categoryLookupValue &&
        this.categoryLookupValue != null &&
        this.categoryLookupValue != undefined
      ) {
        this.categoriesItem.categoryId = this.categoryLookupValue.id;
      }
      this.httpService
        .update('category_item', this.categoriesItem)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.updateCategories.onClose();
          }
        });
    }
    this.submitted = true;
  }
}
