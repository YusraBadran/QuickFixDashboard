import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShearedService {
  public menuSources: BehaviorSubject<any[]>;
  constructor() {
    this.menuSources = new BehaviorSubject<any>([]);
  }
  loadMenu(menu: any[]) {
    this.menuSources.next(menu);
    console.log(menu);
  }
  dark() {
    var theme = document.getElementById('theme');
    theme?.setAttributeNode(document.createAttribute('href'));
    theme?.setAttribute('href', 'assets/style/themes/lara-dark-blue/theme.css');
    localStorage.setItem('theme', 'dark');
    // this.isDArkTheme = true;
  }
  light() {
    var theme = document.getElementById('theme');
    theme?.setAttributeNode(document.createAttribute('href'));
    theme?.setAttribute(
      'href',
      'assets/style/themes/lara-light-blue/theme.css'
    );
    localStorage.setItem('theme', 'light');
    // this.isDArkTheme = false;
  }
}
