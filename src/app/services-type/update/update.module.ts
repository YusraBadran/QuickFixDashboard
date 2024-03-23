import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { UpdateRoutingModule } from './update-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: [UpdateComponent]
})
export class UpdateModule { }
