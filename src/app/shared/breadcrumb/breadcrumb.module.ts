import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbRoutingModule } from './breadcrumb-routing.module';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, BreadcrumbRoutingModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
