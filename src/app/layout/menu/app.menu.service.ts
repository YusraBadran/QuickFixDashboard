import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuChangeEvent } from '../api/menuchangeevent';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public menuSources: any;
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  constructor() {}
  loadMenu(menu: any) {
    this.menuSources = menu;
    console.log(menu);
  }
  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }
}
