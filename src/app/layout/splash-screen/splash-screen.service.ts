import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private _splash = new BehaviorSubject<boolean>(false);
  public readonly splash$ = this._splash.asObservable();

  show() {
    this._splash.next(true);
  }

  hide() {
    setTimeout(() => {
      this._splash.next(false);
    }, 400);
  }
}
