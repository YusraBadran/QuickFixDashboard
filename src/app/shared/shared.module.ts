import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService } from 'primeng/dynamicdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { TranslatesService } from './translate/translate.service';
import { AlertMessageService } from './services/alert-message.service';
import { RadioButtonModule } from 'primeng/radiobutton';
//import { GoogleMap } from '@angular/google-maps';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AuthHttpRequestMessageService } from './services/HttpRequestMessage/authHttpRequestMessag.service';
//

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    TranslateModule,
    DividerModule,
    TableModule,
    CardModule,
    TagModule,
    BreadcrumbModule,
    DropdownModule,
    SplitButtonModule,
    FileUploadModule,
    ToolbarModule,
    TriStateCheckboxModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MultiSelectModule,
    TabMenuModule,
    TabViewModule,
    InputNumberModule,
    DynamicDialogModule,
    StepsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    TranslateModule,
    DividerModule,
    TableModule,
    CardModule,
    TagModule,
    BreadcrumbModule,
    DropdownModule,
    SplitButtonModule,
    FileUploadModule,
    ToolbarModule,
    TriStateCheckboxModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MultiSelectModule,
    TabMenuModule,
    TabViewModule,
    InputNumberModule,
    DynamicDialogModule,
    StepsModule,
  ],
  providers: [
    TranslatesService,
    TranslateStore,
    TranslateService,
    AlertMessageService,
    //GoogleMap,
    DialogService,
    AuthHttpRequestMessageService,
  ],
})
export class SharedModule {}
