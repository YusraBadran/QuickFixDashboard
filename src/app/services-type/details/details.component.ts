import { Component, OnInit } from '@angular/core';
import { ServicesType } from '../model/services-type';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { ServicesTypeService } from '../service/services-type.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  serviceType: ServicesType = new ServicesType();
  status: StatusReturn = new StatusReturn();
  id!: string;
  constructor(
    private detailsService: ServicesTypeService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  closePopup() {
    this.detailsService.close();
  }

  getById(id: string) {
    this.httpService
      .getById('service_type', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.serviceType = response.serviceType;
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.serviceType.status)
        );
      });
  }

  ngOnInit(): void {
    this.id = this.detailsService.Id;
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
