import { Component } from '@angular/core';
import { Tokens } from './shared/models/tokens';
import { routes } from './shared/router/router';
import { LoaderService } from './shared/services/loader/loader.service';
import { ShearedService } from './shared/services/sheared.service';
import { NavigationEnd, NavigationStart, Router,Event as RouterEvent, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token = Tokens;
  route = routes;
  constructor(
    private router: Router,
    private loader: LoaderService,
    private ShearedService: ShearedService
  ) {
    let localTheme = localStorage.getItem('theme') ?? null;
    if (localTheme == null || localTheme == undefined) {
      this.ShearedService.light();
    } else if (localTheme == 'dark') {
      this.ShearedService.dark();
    } else if (localTheme == 'light') {
      this.ShearedService.light();
    }
    if (!this.token.isLogin) {
      this.router.navigate([this.route.signIn]);
    }
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      }
      if (event instanceof NavigationEnd) {
        this.loader.hide();
      }
    });
  }
}
