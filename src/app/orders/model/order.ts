export class Order {
  id!: string;
  status!: number;
  orderNumber!: number;
  totalPrice!: number;
  note!: string;
  phone!: string;
  date!: string;
  periodByDay!: string;
  user!: User;
  address!: Address;
  orderDetails!: OrderDetail[];
}

export class User {
  fullName!: string;
  email!: string;
}

export class Address {
  location!: string;
  longitude!: number;
  latitude!: number;
  description!: string;
}

export class OrderDetail {
  id!: string;
  serviceId!: string;
  name!: string;
  price!: number;
  category!: string;
  note!: string;
}
