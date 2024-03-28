import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadedModule } from 'src/app/shared/file-uploaded/file-uploaded.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, FormsModule, SharedModule, FileUploadedModule],

  exports: [CreateComponent],
})
export class CreateModule {}
