import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import { SharedComponentModule } from '../shared-component.module';
import { SearchTableHeaderComponent } from './search-table-header.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [SearchTableHeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [SearchTableHeaderComponent],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => SearchTableHeaderComponent),
  //     multi: true,
  //   },
  // ],
})
export class SearchTableHeaderModule {}
