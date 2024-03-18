import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchTable } from './model/sheaech-table';

@Component({
  selector: 'shared-search-table-header',
  templateUrl: './search-table-header.component.html',
})
export class SearchTableHeaderComponent {
  @Input() test: SearchTable[] = [
    {
      inputTextName: 'inputText1',
      lapel: 'shared.searchTableBar.hintFieldFilter1',
      hintInput: 'shared.searchTableBar.hintFieldFilter1',
      IsAutoComplete: false,
      IsDropDawn: false,
      IsInput: true,
      item: [],
      position: '1',
    },
  ];
  @Input() dropItem: any[] = [];
  @Input() selectedTableItem!: any;
  @Input() hintFieldFilter1: any = 'shared.searchTableBar.hintFieldFilter1';
  @Input() hintFieldFilter2: any = 'shared.searchTableBar.hintFieldFilter2';
  @Input() filter1Title: any = 'shared.searchTableBar.Filter1Title';
  @Input() Filter2Title: any = 'shared.searchTableBar.Filter2Title';
  /**
   * @description
   * @type {string}
   * @memberof SearchTableHeaderComponent
   * @example
   * fieldFilter1 = 'fieldFilter1';
   * fieldFilter2 = 'fieldFilter2';
   * dropFieldFilter = 'dropFieldFilter';
   * onClick = 'onClick';
   */

  @Output() allField: EventEmitter<any> = new EventEmitter();
  @Output() glopFieldFilter: EventEmitter<any> = new EventEmitter();
  @Output() fieldFilter1: EventEmitter<any> = new EventEmitter();
  @Output() fieldFilter2: EventEmitter<any> = new EventEmitter();
  @Output() dropFieldFilter: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() isFilterBarOpen: EventEmitter<boolean> = new EventEmitter();
  @Output() onAddButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteButtonClicked: EventEmitter<any> = new EventEmitter();
  inputFilter1: any;
  inputFilter2: any;
  dropFieldFilters: any;
  IsFilterBarOpen: boolean = false;
  // Component logic goes here
  constructor() {}

  GlopFilter(event: any) {
    this.glopFieldFilter.emit(event);
  }
  searchFilter() {
    this.fieldFilter1.emit(this.inputFilter1);
    this.fieldFilter2.emit(this.inputFilter2);
    this.dropFieldFilter.emit(this.dropFieldFilters);
    var dropFieldFilterAll = '';
    if (this.dropFieldFilters != null || this.dropFieldFilters != undefined) {
      dropFieldFilterAll = this.dropFieldFilters;
    }
    var inputFilter1All = '';
    if (this.inputFilter1 != null || this.inputFilter1 != undefined) {
      inputFilter1All = this.inputFilter1;
    }
    var inputFilter2All = '';
    if (this.inputFilter2 != null || this.inputFilter2 != undefined) {
      inputFilter2All = this.inputFilter2;
    }
    this.allField.emit({
      dropFieldFilterAll,
      inputFilter1All,
      inputFilter2All,
    });
    dropFieldFilterAll = '';
    inputFilter1All = '';
    inputFilter2All = '';
  }
  openFilterBar() {
    this.IsFilterBarOpen = !this.IsFilterBarOpen;
    this.isFilterBarOpen.emit(this.IsFilterBarOpen);
  }
  addButtonClicked() {
    this.onAddButtonClicked.emit();
  }
  deleteButtonClicked() {
    this.onDeleteButtonClicked.emit();
  }
}
