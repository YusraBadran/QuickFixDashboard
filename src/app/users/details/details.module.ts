import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordModule } from 'primeng/password';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DetailsRoutingModule,
    SharedModule,
    PasswordModule,
    ImageModule,
  ],
  providers: [],
  exports: [DetailsComponent],
})
export class DetailsModule {}
