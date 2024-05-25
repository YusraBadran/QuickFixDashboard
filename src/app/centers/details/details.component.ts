import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/router/router';
import { CreateCenters } from '../model/create-center';
import { StatusEnum, StatusReturn } from 'src/app/shared/models/status';
import { TranslatesService } from 'src/app/shared/translate/translate.service';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { Centers } from '../model/centers';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  center: Centers = new Centers();
  status: StatusReturn = new StatusReturn();
  states: any[] = [];
  state: any;
  submitted = false;
  items!: MenuItem[];
  home!: MenuItem;
  rout = routes;
  id!: string;
  constructor(
    public translate: TranslatesService,
    public messageAlert: AlertMessageService,
    private httpService: BasMicroServicesApiService,
    private route: ActivatedRoute
  ) {}
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
          label: this.translate.getTranslate('public.details'),
        },
      ];
    }, 1000);
    this.getById(this.id);
    // Initialize component
  }
}
