import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRoutingModule,
    SharedModule,
    PasswordModule,
  ],
  providers: [],
  exports: [CreateComponent],
})
export class CreateModule {}
