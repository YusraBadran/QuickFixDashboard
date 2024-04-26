import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { AddressModule } from 'src/app/shared/address/address.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRoutingModule } from './create-routing.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, CreateRoutingModule, SharedModule, AddressModule],
})
export class CreateModule {}
