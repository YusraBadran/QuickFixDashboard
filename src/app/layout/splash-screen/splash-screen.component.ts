import { Component } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'shell-splash-screen',
  templateUrl: './splash-screen.component.html',
})
export class SplashScreenComponent {
  // Component logic goes here
  constructor(private splash: SplashScreenService) {}
  splash$ = this.splash.splash$;
}
