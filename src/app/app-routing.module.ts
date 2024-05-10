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
    path: '',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./layout/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    // canActivate: [gateWayGuard],
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
    path: 'categoriesItem',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./categories-item/category-item.module').then(
        (m) => m.CategoryItemModule
      ),
  },
  {
    path: 'users',
    component: AppLayoutComponent,
    loadChildren: () => import('./users/user.module').then((m) => m.UserModule),
  },
  {
    path: 'centers',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./centers/center.module').then((m) => m.CenterModule),
  },
  {
    path: 'profile',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./users/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'orders',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./orders/order.module').then((m) => m.OrderModule),
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
