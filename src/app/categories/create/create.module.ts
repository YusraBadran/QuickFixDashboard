import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, FormsModule, SharedModule],

  exports: [CreateComponent],
})
export class CreateModule {}
