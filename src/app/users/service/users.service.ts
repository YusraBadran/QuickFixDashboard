import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public ref!: DynamicDialogRef;
  public Id: any;
  private _loadData = new BehaviorSubject<boolean>(false);
  public readonly _loadData$ = this._loadData.asObservable();
  constructor(public dialogService: DialogService) {}
  // showCreate() {
  //   this.ref = this.dialogService.open(CreateComponent, {
  //     header: 'Create Service Type',
  //     width: '50rem',
  //     contentStyle: {
  //       'max-height': '800px',
  //       overflow: 'auto',
  //       padding: '0 1.5rem 0rem 1.5rem',
  //     },
  //   });
  // }
  // showDetails(Id: any) {
  //   this.Id = Id;
  //   this.ref = this.dialogService.open(DetailsComponent, {
  //     header: 'Details Category',
  //     width: '50rem',

  //     contentStyle: {
  //       'max-height': '800px',
  //       overflow: 'auto',
  //       padding: '0 1.5rem 0rem 1.5rem',
  //     },
  //   });
  // }
  // showUpdate(Id: any) {
  //   this.Id = Id;
  //   this.ref = this.dialogService.open(UpdateComponent, {
  //     header: 'Update Category',
  //     width: '50rem',

  //     contentStyle: {
  //       'max-height': '800px',
  //       overflow: 'auto',
  //       padding: '0 1.5rem 0rem 1.5rem',
  //     },
  //   });
  // }
  onClose() {
    this.ref.close();
    this._loadData.next(true);
  }
  close() {
    this.ref.close();
  }
  // Add your methods here
}
