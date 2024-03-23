import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(public router: Router) {}

  public navigationRout(url: any, Id: string, key: string) {
    this.router.navigate([url], { queryParams: { Id: Id } });
    // send
  }
}
