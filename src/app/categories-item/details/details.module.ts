import { Component, NgModule, OnInit } from '@angular/core';
import { DetailsComponent } from './details.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, SharedModule],
  exports: [DetailsComponent],
})
export class DetailsModule {}
