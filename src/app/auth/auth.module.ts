import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from '../shared/models/CustomLoader ';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule.forChild(
      {
        loader:{
          provide: TranslateLoader,
          useClass:CustomLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]

        }
      }
    )
  ],
  providers: [],
  exports: []
})
export class AuthModule { }
