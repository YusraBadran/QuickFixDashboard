import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categories } from '../model/categories';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { ServiceCategories } from '../service/categories.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';
import { UpdateCategoriesRequest } from '../model/update-Requst';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  id: any;
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  categories: Categories = new Categories();
  categoryUpdate: UpdateCategoriesRequest = new UpdateCategoriesRequest();
  status: StatusReturn = new StatusReturn();
  serviceType: any;
  submitLode: boolean = false;
  serviceTypeValue = {} as any;
  categoryLookup: any;
  categoryLookupValue = {} as any;
  option: any[] = [];
  optionValue: any = {} as any;
  constructor(
    private updateCategories: ServiceCategories,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  ngOnInit(): void {
    this.id = this.updateCategories.Id;
    setTimeout(() => {
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
    }, 1000);
    this.getById(this.id);
    this.getServiceLookup();
    this.getCategoryLookup();
  }
  getById(id: string) {
    this.httpService
      .getById('category', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.categories = response.category;
        if (
          this.categories.serviceType != null &&
          this.categories.serviceId != null
        ) {
          this.serviceTypeValue = this.categories.serviceType;
          this.optionValue = {
            name: this.translate.getTranslate('public.no'),
            value: false,
          };
        }
        if (
          this.categories.subCategory != null &&
          this.categories.subCategoryId != null
        ) {
          this.categoryLookupValue = this.categories.subCategory;
          this.optionValue = {
            name: this.translate.getTranslate('public.yes'),
            value: true,
          };
        }
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.categories.state)
        );
      });
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
    this.updateCategories.close();
  }
  updateCategory() {
    if (this.categories.name && this.categories.description && this.state) {
      this.categoryUpdate.id = this.categories.id;
      this.categoryUpdate.name = this.categories.name;
      this.categoryUpdate.description = this.categories.description;
      this.categoryUpdate.logo = this.categories.logo;
      this.categoryUpdate.state = this.status.getStatusNumber(this.state);
      if (
        this.serviceTypeValue &&
        this.serviceTypeValue != null &&
        this.serviceTypeValue != undefined
      ) {
        this.categoryUpdate.serviceId = this.serviceTypeValue.id;
      }
      if (
        this.categoryLookupValue &&
        this.categoryLookupValue != null &&
        this.categoryLookupValue != undefined
      ) {
        this.categoryUpdate.subCategoryId = this.categoryLookupValue.id;
      }
      this.submitLode = true;
      this.httpService
        .update('category', this.categoryUpdate)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.submitLode = false;
            this.updateCategories.onClose();
          }
        });
    }
    this.submitted = true;
  }
}
