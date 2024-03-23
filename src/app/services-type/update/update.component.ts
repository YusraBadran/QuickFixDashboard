import { Component, OnInit } from '@angular/core';
import { ServicesType } from '../model/services-type';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { ServicesTypeService } from '../service/services-type.service';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent {
  submitted: boolean = false;
  states: any[] = [];
  state: any;
  serviceType: ServicesType = new ServicesType();
  status: StatusReturn = new StatusReturn();
  id!: string;
  constructor(
    private updateService: ServicesTypeService,
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService
  ) {}

  closePopup() {
    this.updateService.close();
  }
  updateServiceType() {
    if (this.serviceType.name && this.serviceType.description && this.state) {
      this.serviceType.status = this.status.getStatusNumber(this.state);
      this.httpService
        .update('service_type', this.serviceType)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.updateService.onClose();
          }
        });
    }
    this.submitted = true;
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
    this.id = this.updateService.Id;
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
