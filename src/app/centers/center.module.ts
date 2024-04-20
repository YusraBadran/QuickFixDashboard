import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center.component';
import { CenterRoutingModule } from './center-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from '../shared/models/CustomLoader ';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CenterComponent],
  imports: [
    CommonModule,
    CenterRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  exports: [CenterComponent],
})
export class CenterModule {}
