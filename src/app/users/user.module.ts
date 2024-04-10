import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from '../shared/models/CustomLoader ';
import { HttpLoaderFactory } from '../app.module';
import { UserService } from './service/users.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [UserService],

  exports: [UserComponent],
})
export class UserModule {}
