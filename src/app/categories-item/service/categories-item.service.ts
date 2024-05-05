import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { CreateComponent } from '../create/create.component';
import { DetailsComponent } from '../details/details.component';
import { UpdateComponent } from '../update/update.component';
import { TranslatesService } from 'src/app/shared/translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceCategoriesItem {
  public ref!: DynamicDialogRef;
  public Id: any;
  private _loadData = new BehaviorSubject<boolean>(false);
  public readonly _loadData$ = this._loadData.asObservable();
  constructor(
    public dialogCatogriesItem: DialogService,
    private translate: TranslatesService
  ) {}
  showCreate() {
    this.ref = this.dialogCatogriesItem.open(CreateComponent, {
      header: this.translate.getTranslate('categoriesItem.categoryItemCreate'),
      width: '50rem',
      contentStyle: {
        'max-height': '800px',
        overflow: 'auto',
        padding: '0 1.5rem 0rem 1.5rem',
      },
    });
  }
  showDetails(Id: any) {
    this.Id = Id;
    this.ref = this.dialogCatogriesItem.open(DetailsComponent, {
      header: this.translate.getTranslate('categoriesItem.categoryItemDetail'),
      width: '50rem',

      contentStyle: {
        'max-height': '800px',
        overflow: 'auto',
        padding: '0 1.5rem 0rem 1.5rem',
      },
    });
  }
  showUpdate(Id: any) {
    this.Id = Id;
    this.ref = this.dialogCatogriesItem.open(UpdateComponent, {
      header: this.translate.getTranslate('categoriesItem.categoryItemUpdate'),
      width: '50rem',

      contentStyle: {
        'max-height': '800px',
        overflow: 'auto',
        padding: '0 1.5rem 0rem 1.5rem',
      },
    });
  }
  onClose() {
    this.ref.close();
    this._loadData.next(true);
  }
  close() {
    this.ref.close();
  }
  // Add your methods here
}
