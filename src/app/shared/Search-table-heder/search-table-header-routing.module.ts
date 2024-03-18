import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTableHeaderComponent } from './search-table-header.component';

const routes: Routes = [
  // Define your routes here
  { path: '', component: SearchTableHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTableHeaderRoutingModule {}
