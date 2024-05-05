export class UpdateRequest {
  id!: string;
  firstName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  phoneNumber!: string;
  userState!: Number;
  permissions: any[] = [];
}
