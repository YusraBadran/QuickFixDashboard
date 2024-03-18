import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalService } from '../services/localStorage/local.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(public router: Router, private storage: LocalService) {}

  public navigationRout(url: any, Id: string, key: string) {
    this.router.navigate([url], { queryParams: { Id: Id } });
    // send
    this.storage.saveData(key, Id!);
  }
}
