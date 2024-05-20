import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { TranslatesService } from '../../shared/translate/translate.service';
import { Router } from '@angular/router';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
//import { Role } from 'src/app/settings/users/model/role';
import { routes } from 'src/app/shared/router/router';
import { ShearedService } from 'src/app/shared/services/sheared.service';
import { Tokens } from 'src/app/shared/models/tokens';
import { map } from 'rxjs';
import { Paging } from 'src/app/shared/models/paging';
import { Notification } from './model/notification';
import { EventHandlerService } from '../service/event-handler.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  paging: Paging = new Paging();
  tempData!: any[];
  public lang: any = [];
  public activeLang: any;
  notification: Notification[] = [];
  notifyCount: any = 0;
  isDArkTheme: boolean = false;
  route = routes;
  token = Tokens;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  @ViewChild('settingsmenu') settingsmenu!: ElementRef;
  @ViewChild('settingsmenubutton') settingsmenubutton!: ElementRef;

  constructor(
    private httpService: BasMicroServicesApiService,
    public layoutService: LayoutService,
    public translate: TranslatesService,
    private apiService: BasMicroServicesApiService,
    private router: Router,
    private eventHandlerService: EventHandlerService,
    private ShearedService: ShearedService
  ) {
    this.eventHandlerService.notificationEvent.subscribe((data: string) => {
      if (data == 'refresh') {
        this.getNotify();
      }
    });
    // the lang to use, if the lang isn't available, it will use the current loader to get them
  }
  get inputStyle(): string {
    return this.layoutService.config.inputStyle;
  }

  set inputStyle(_val: string) {
    this.layoutService.config.inputStyle = _val;
  }
  logout() {
    this.apiService.logout().subscribe((data) => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('menu');
      this.router.navigate([this.route.signIn]);
    });
  }
  getNotify() {
    let moduleType = 'orders';
    this.apiService
      .notification(moduleType)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((response) => {
        this.notification = response.notify;
        this.notifyCount = this.notification.length;
      });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.lang = [
      {
        label: 'public.en',
        icon: 'us',
        type: 'en',
      },
      {
        label: 'public.ar',
        icon: 'ye',
        type: 'ar',
      },
    ];
    var localLang = localStorage.getItem('lang');
    if (localLang == 'en') {
      const webdir = document.getElementById('dir');
      const icondir = document.querySelectorAll('.icondir');
      webdir?.classList.remove('rtl');
      webdir?.classList.add('ltr');
      icondir?.forEach((element) => {
        element.classList.remove('-rotate-180');
      });
      this.activeLang = {
        label: 'public.en',
        icon: 'us',
        type: 'en',
      };
    }
    if (localLang == 'ar') {
      const webdir = document.getElementById('dir');
      const icondir = document.querySelectorAll('.icondir');
      icondir?.forEach((element) => {
        element.classList.add('-rotate-180');
      });
      webdir?.classList.remove('ltr');
      webdir?.classList.add('rtl');
      this.activeLang = {
        label: 'public.ar',
        icon: 'ye',
        type: 'ar',
      };
    }
    var localTheme = localStorage.getItem('theme');
    if (localTheme == 'dark') {
      this.isDArkTheme = true;
    }
    if (localTheme == 'light') {
      this.isDArkTheme = false;
    }
  }
  dark() {
    this.ShearedService.dark();
    this.isDArkTheme = true;
  }
  light() {
    this.ShearedService.light();
    this.isDArkTheme = false;
  }
  language(lang: any) {
    this.translate.translateLang(lang.type);
    this.activeLang = lang;
  }
}
