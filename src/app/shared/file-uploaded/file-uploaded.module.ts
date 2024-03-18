import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadedComponent } from './file-uploaded.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FileUploadedComponent],
  imports: [CommonModule, FileUploadModule, TranslateModule],
  exports: [FileUploadedComponent],
})
export class FileUploadedModule {}
