import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesTypeComponent } from './services-type.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesTypeRoutingModule } from './services-type-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServicesTypeService } from './service/services-type.service';
import { CustomLoader } from '../shared/models/CustomLoader ';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ServicesTypeComponent
  ],
  imports: [
    CommonModule,
    ServicesTypeRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule
  ],
  providers: [ServicesTypeService ],

})
export class ServicesTypeModule { }
