import { Component } from '@angular/core';
import { routes } from 'projects/shell-mf/src/app/shared/router/router';

@Component({
  selector: 'shared-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  // Component logic goes here
  public route = routes;
  public iconDir: any;
  constructor() {
    this.iconDir = localStorage.getItem('lang');
  }
}
