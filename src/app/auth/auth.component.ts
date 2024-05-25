import { Component, OnInit } from '@angular/core';
import { ShearedService } from '../shared/services/sheared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  constructor(private ShearedService: ShearedService) {
    let localTheme = localStorage.getItem('theme') ?? null;
    if (localTheme == null || localTheme == undefined) {
      this.ShearedService.light();
    } else if (localTheme == 'dark') {
      this.ShearedService.dark();
    } else if (localTheme == 'light') {
      this.ShearedService.light();
    }

    var localLang = localStorage.getItem('lang');
    if (localLang == 'en') {
      const webdir = document.getElementById('dir');
      const icondir = document.querySelectorAll('.icondir');
      webdir?.classList.remove('rtl');
      webdir?.classList.add('ltr');
      icondir?.forEach((element) => {
        element.classList.remove('-rotate-180');
      });
    }
    if (localLang == 'ar') {
      const webdir = document.getElementById('dir');
      const icondir = document.querySelectorAll('.icondir');
      icondir?.forEach((element) => {
        element.classList.add('-rotate-180');
      });
      webdir?.classList.remove('ltr');
      webdir?.classList.add('rtl');
    }
  }

  ngOnInit(): void {}
}
