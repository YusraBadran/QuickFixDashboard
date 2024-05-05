import { AddressRequest } from './address_request';

export class CreateCenters {
  name!: string;
  phone!: string;
  description!: string;
  state!: number;
  address: AddressRequest = new AddressRequest();
}
