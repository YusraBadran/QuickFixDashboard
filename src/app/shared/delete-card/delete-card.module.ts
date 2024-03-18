import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteCardComponent } from './delete-card.component';
import { DeleteCardRoutingModule } from './delete-card-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [DeleteCardComponent],
  imports: [CommonModule, DeleteCardRoutingModule, SharedModule],
  exports: [DeleteCardComponent],
})
export class DeleteCardModule {}
