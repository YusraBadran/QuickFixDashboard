import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { TranslatesService } from '../../shared/translate/translate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
  constructor(
    public layoutService: LayoutService,
    public _translat: TranslatesService
  ) {}
}
