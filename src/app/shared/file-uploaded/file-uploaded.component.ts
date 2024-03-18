import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasMicroServicesApiService } from 'src/app/micro-services-api/micro-frontend-options/bas-micro-services-api.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'shared-file-uploaded',
  templateUrl: './file-uploaded.component.html',
})
export class FileUploadedComponent implements OnInit {
  @Input() mode: 'basic' | 'advanced' | undefined = 'basic';
  @Input() multiple: boolean = true;
  @Input() labelText: string = 'Upload';
  @Input() companyFolder!: string;
  @Input() moduleFolder!: string;
  @Input() uploadOnClick = new EventEmitter<any>();
  @Output() urlResult = new EventEmitter<any>();
  uploadedSingleFiles!: any;
  uploadedFilesList: any[] = [];
  fileUpload!: File;
  filesUpload: FormData[] = [];
  constructor(private apiService: BasMicroServicesApiService) {}
  /**
   * upload File
   * @param event
   */
  onUpload(event: any) {
    console.log(event);

    if (this.multiple) {
      this.multipleUpload(event);
    }
    if (!this.multiple) {
      this.singleUpload(event);
    }
  }
  /**
   * multiple upload
   * @param event
   */
  multipleUpload(event: any) {
    const formData = new FormData();
    for (let file of event.files) {
      this.uploadedFilesList.push(file);
      formData.append('file', file, file.name);
    }
    this.upload(this.companyFolder, this.moduleFolder, formData);
  }
  singleUpload(event: any) {
    const formData = new FormData();
    for (let file of event.files) {
      this.uploadedSingleFiles = file;
      formData.append('file', file, file.name);
    }

    this.upload(this.companyFolder, this.moduleFolder, formData);
  }
  /**
   * remove File
   * @param event
   */
  onRemove(event: any) {
    if (this.multiple) {
      this.multipleRemove(event);
    }
    if (!this.multiple) {
      this.singleRemove(event);
    }
  }
  multipleRemove(event: any) {
    this.uploadedFilesList.splice(this.uploadedFilesList.indexOf(event), 1);
  }
  singleRemove(event: any) {
    this.uploadedSingleFiles = null;
  }
  upload(companyFolder: string, moduleFolder: string, fileUpload: FormData) {
    this.apiService
      .uploadFile(companyFolder, moduleFolder, fileUpload)
      .subscribe((res) => {
        this.urlResult.emit(res);
      });
  }
  ngOnInit(): void {}
}
