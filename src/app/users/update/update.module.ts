import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update.component';
import { FileUploadedModule } from 'src/app/shared/file-uploaded/file-uploaded.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordModule } from 'primeng/password';
import { UpdateRoutingModule } from './update-routing.module';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    FormsModule,
    SharedModule,
    PasswordModule,
  ],
  providers: [],
  exports: [UpdateComponent],
})
export class UpdateModule {}
