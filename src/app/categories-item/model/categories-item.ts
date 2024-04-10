import { Lookups } from 'src/app/shared/models/lookups';

export class CategoriesItem {
  id!: string;
  name!: string;
  logo!: string;
  description!: string;
  status!: number;
  price!: number;
  categoryId!: string;
  category: Lookups = new Lookups();
  image: any[] = [];
}
