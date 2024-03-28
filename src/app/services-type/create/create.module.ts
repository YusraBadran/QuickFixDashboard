import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageModule } from 'primeng/image';
import { FileUploadedModule } from 'src/app/shared/file-uploaded/file-uploaded.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    FileUploadedModule,
    ImageModule,
  ],
  providers: [],
  exports: [CreateComponent],
})
export class CreateModule {}
