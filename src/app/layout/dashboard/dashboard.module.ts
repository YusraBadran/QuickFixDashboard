import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from 'src/app/shared/models/CustomLoader ';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { SharedModule } from 'src/app/shared/shared.module';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    ImageModule,
    SplitterModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
