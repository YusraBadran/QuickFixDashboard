import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { UpdateRoutingModule } from './update-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadedModule } from 'src/app/shared/file-uploaded/file-uploaded.module';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    SharedModule,
    FileUploadedModule,
  ],
  providers: [],
  exports: [UpdateComponent],
})
export class UpdateModule {}
