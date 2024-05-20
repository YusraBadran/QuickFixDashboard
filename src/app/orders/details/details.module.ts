import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { CustomLoader } from 'src/app/shared/models/CustomLoader ';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/shared/address/address.module';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    AddressModule,
    SharedModule,
    ImageModule,
  ],
  exports: [DetailsComponent],
})
export class DetailsModule {}
