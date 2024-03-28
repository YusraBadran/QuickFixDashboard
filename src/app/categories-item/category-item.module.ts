import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryRoutingModule } from '../categories/category-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from '../shared/models/CustomLoader ';
import { HttpLoaderFactory } from '../app.module';
import { ServiceCategoriesItem } from './service/categories-item.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: CategoryItemComponent,
  },
];

@NgModule({
  declarations: [CategoryItemComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
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
  providers: [ServiceCategoriesItem],
})
export class CategoryItemModule {}
