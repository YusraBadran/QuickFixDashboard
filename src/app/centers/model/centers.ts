import { Address } from 'src/app/shared/models/address';

export class Centers {
  id!: string;
  name!: string;
  phone!: string;
  description!: string;
  state!: number;
  address: Address = new Address();
}
