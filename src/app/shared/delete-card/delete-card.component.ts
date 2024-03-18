import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-delete-card',
  templateUrl: './delete-card.component.html',
})
export class DeleteCardComponent {
  // Component logic goes here
  public submitted: boolean = false;
  public isConfirm: boolean = false;
  public isVal: boolean = true;
  @Output() clickDeleteButton = new EventEmitter<any>();
  constructor() {}
  public isValidate() {
    if (!this.isConfirm) {
      this.isVal = false;
    } else {
      this.isVal = true;
    }
  }
  /**
   * delete button click event
   */
  public onClicKedDelete() {
    if (this.isConfirm) {
      this.clickDeleteButton.emit();
    }
    // this.isConfirm = true;
    this.submitted = true;
  }
}
