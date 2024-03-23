import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesTypeComponent } from './services-type.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesTypeComponent,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./update/update.module').then((m) => m.UpdateModule),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./details/details.module').then((m) => m.DetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesTypeRoutingModule {}
