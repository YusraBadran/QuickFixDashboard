import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/router/router';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { Centers } from '../model/centers';
import { AddressRequest } from '../model/address_request';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  address: AddressRequest = new AddressRequest();
  center: Centers = new Centers();
  status: StatusReturn = new StatusReturn();
  states: any[] = [];
  phone: any;
  state: any;
  submitted = false;
  items!: MenuItem[];
  home!: MenuItem;
  rout = routes;
  id!: string;
  submitLode: boolean = false;
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

  updateCenter() {
    this.center.address.location = this.address.location;
    this.center.address.description = this.address.description;
    this.center.address.latitude = this.address.latitude;
    this.center.address.longitude = this.address.longitude;
    if (
      this.center.name &&
      this.center.description &&
      this.state &&
      this.phone &&
      this.center.address.latitude &&
      this.center.address.longitude
    ) {
      this.center.phone = this.phone.toString();
      this.center.status = this.status.getStatusNumber(this.state);
      this.submitLode = true;
      this.httpService
        .update('centers', this.center)
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
  getById(id: string) {
    this.httpService
      .getById('centers', id)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.center = response;
        this.phone = this.center.phone;
        this.address = this.center.address;
        this.state = this.translate.getTranslate(
          this.status.getStatusName(this.center.status)
        );
      });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.home = { icon: 'pi pi-home', routerLink: '/' };
      this.items = [
        {
          label: this.translate.getTranslate('menu.centers.title'),
          routerLink: this.rout.centers,
        },
        {
          label: this.translate.getTranslate('public.update'),
        },
      ];

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
    // Initialize component
  }
}
