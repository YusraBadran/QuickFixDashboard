import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { ServiceCategories } from '../service/categories.service';
import { Categories } from '../model/categories';
import { Lookups } from 'src/app/shared/models/lookups';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  categories: Categories = new Categories();

  status: StatusReturn = new StatusReturn();
  serviceType: any;
  serviceTypeValue: any;
  categoryLookup: any;
  categoryLookupValue: any;
  option: any[] = [];
  optionValue: any;
  id!: string;
  constructor(
    private detailCategories: ServiceCategories,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  closePopup() {
    this.detailCategories.close();
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
        console.log(response);
        this.categories = response.category;
        console.log(this.categories);
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.categories.state)
        );
        this.serviceType = this.translate.getTranslate(
          this.status.getStatusName(this.categories.state)
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
          this.status.getStatusName(StatusEnum.Inactive)
        ),
      ];
    }, 1000);
    this.getById(this.id);
  }
}
