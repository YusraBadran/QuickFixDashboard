import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
 SharedModule,
 AvatarModule,
 PasswordModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
