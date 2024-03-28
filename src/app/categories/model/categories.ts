import { Lookups } from 'src/app/shared/models/lookups';

export class Categories {
  id!: string;
  name!: string;
  description!: string;
  state!: number;
  logo!: string;
  serviceId!: string;
  subCategoryId!: string;
  serviceType: Lookups = new Lookups();
  subCategory: Lookups = new Lookups();
}
