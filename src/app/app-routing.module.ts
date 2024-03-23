import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: 'auth',
    // component: AppLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: AppLayoutComponent,
  },
  {
    path: 'services-type',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./services-type/services-type.module').then(
        (m) => m.ServicesTypeModule
      ),
  },
  {
    path: 'categories',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./categories/category.module').then((m) => m.CategoryModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
