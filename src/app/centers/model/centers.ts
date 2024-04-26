import { Address } from 'src/app/shared/models/address';

export class centers {
  id!: string;
  name!: string;
  description!: string;
  state!: number;
  address: Address = new Address();
}
