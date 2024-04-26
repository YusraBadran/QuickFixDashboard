import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { AddressModule } from 'src/app/shared/address/address.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateRoutingModule } from './update-routing.module';

@NgModule({
  declarations: [UpdateComponent],
  imports: [CommonModule, UpdateRoutingModule, SharedModule, AddressModule],
})
export class UpdateModule {}
