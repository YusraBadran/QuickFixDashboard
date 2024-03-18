import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { menu } from './menu';
import { MenuService } from './app.menu.service';
import { TranslatesService } from '../../shared/translate/translate.service';
import { map } from 'rxjs';
import { BasMicroServicesApiService } from '../../micro-services-api/micro-frontend-options/bas-micro-services-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = menu;
  // model: any[] = [];
  constructor(
    public layoutService: LayoutService,
    private loadMenu: MenuService,
    private apiService: BasMicroServicesApiService,
    public translate: TranslatesService
  ) {}

  ngOnInit() {
    // var menudata = localStorage.getItem('menu') ?? null;
    // if (menudata) {
    //   this.model = JSON.parse(menudata);
    // }
  }
}
