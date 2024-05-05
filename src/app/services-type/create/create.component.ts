import { Component, OnInit } from '@angular/core';

import { ServicesTypeService } from '../service/services-type.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { ServicesType } from '../model/services-type';
import { createServiceTypeRequest } from '../model/create-Requst';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  submitLode: boolean = false;
  serviceType: createServiceTypeRequest = new createServiceTypeRequest();
  status: StatusReturn = new StatusReturn();
  constructor(
    private createService: ServicesTypeService,
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
    }, 1000);
  }
  getIog(event: any) {
    this.serviceType.logo = event[0];
  }
  closePopup() {
    this.createService.close();
  }
  createServiceType() {
    if (this.serviceType.name && this.serviceType.description && this.state) {
      this.serviceType.status = this.status.getStatusNumber(this.state);
      this.submitLode = true;
      this.httpService
        .create('service_type', this.serviceType)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.submitLode = false;
            this.createService.onClose();
          }
        });
    }
    this.submitted = true;
  }
}
