import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { createCategoriesRequest } from '../model/create-Requst';
import { ServiceCategories } from '../service/categories.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  submitted: boolean = false;
  submitLode: boolean = false;
  states: any[] = [];
  state: any;
  categories: createCategoriesRequest = new createCategoriesRequest();
  status: StatusReturn = new StatusReturn();
  serviceType: any;
  serviceTypeValue: any;
  categoryLookup: any;
  categoryLookupValue = {} as any;
  option: any[] = [];
  optionValue: any = {} as any;
  constructor(
    private createCategories: ServiceCategories,
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
          this.status.getStatusName(StatusEnum.Inactive)
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
    this.getServiceLookup();
    this.getCategoryLookup();
  }
  getServiceLookup() {
    this.httpService
      .lookup('service_type')
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.serviceType = response;
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
    this.categories.logo = event[0];
  }
  closePopup() {
    this.createCategories.close();
  }
  createCatgories() {
    // console.log(this.optionValue?.value==true);{

    // }

    if (this.categories.name && this.categories.description && this.state) {
      this.categories.status = this.status.getStatusNumber(this.state);
      if (
        this.serviceTypeValue &&
        this.serviceTypeValue != null &&
        this.serviceTypeValue != undefined
      ) {
        this.categories.serviceId = this.serviceTypeValue.id;
      }
      if (
        this.categoryLookupValue &&
        this.categoryLookupValue != null &&
        this.categoryLookupValue != undefined
      ) {
        this.categories.subCategoryId = this.categoryLookupValue.id;
      }
      this.submitLode = true;
      this.httpService
        .create('category', this.categories)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.submitLode = false;
            this.createCategories.onClose();
          }
        });
    }
    this.submitted = true;
  }
}
