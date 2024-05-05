import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/router/router';
import { AddressRequest } from '../model/address_request';
import { CreateCenters } from '../model/create-center';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  address: AddressRequest = new AddressRequest();
  center: CreateCenters = new CreateCenters();
  status: StatusReturn = new StatusReturn();
  states: any[] = [];
  submitLode: boolean = false;
  phone: any;
  state: any;
  submitted = false;
  items!: MenuItem[];
  home!: MenuItem;
  rout = routes;
  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private route: ActivatedRoute,
    private routed: Router
  ) {}
  getPosition(event: any) {
    this.address = event;
  }

  createCenter() {
    this.center.address = this.address;
    if (
      this.center.name &&
      this.center.description &&
      this.state &&
      this.phone &&
      this.center.address.latitude &&
      this.center.address.longitude
    ) {
      this.center.phone = this.phone.toString();
      this.center.state = this.status.getStatusNumber(this.state);
      this.submitLode = true;
      this.httpService
        .create('centers', this.center)
        .pipe(
          map((response: any) => {
            return response;
          })
        )
        .subscribe((response: any) => {
          if (response.data.statusCode === 200) {
            this.messageAlert.saveSuccess();
            this.submitLode = false;
            this.routed.navigate([this.rout.centers]);
          }
        });
    }
    this.submitted = true;
  }
  ngOnInit() {
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('menu.centers.title'),
          routerLink: this.rout.centers,
        },
        {
          label: this.translate.getTranslate('public.create'),
        },
      ];
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
}
