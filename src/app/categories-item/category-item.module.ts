import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoryItemComponent,
  },
];

@NgModule({
  declarations: [CategoryItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CategoryItemComponent],
})
export class CategoryItemModule {}
