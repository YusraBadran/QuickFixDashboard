import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
// import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
  // { path: 'login', component: LoginComponent },

  // add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
