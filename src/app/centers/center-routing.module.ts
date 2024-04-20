import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterComponent } from './center.component';

// Import your center components here
// import { CenterComponent } from './center.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
  },
  // {
  //   path: 'create',
  //   loadChildren: () =>
  //     import('./create/create.module').then((m) => m.CreateModule),
  // },
  // {
  //   path: 'details/:id',
  //   loadChildren: () =>
  //     import('./details/details.module').then((m) => m.DetailsModule),
  // },
  // {
  //   path: 'update/:id',
  //   loadChildren: () =>
  //     import('./update/update.module').then((m) => m.UpdateModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterRoutingModule {}
