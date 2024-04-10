import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadedModule } from 'src/app/shared/file-uploaded/file-uploaded.module';

@NgModule({
  declarations: [UpdateComponent],
  imports: [CommonModule, FormsModule, SharedModule, FileUploadedModule],
  exports: [UpdateComponent],
})
export class UpdateModule {}
