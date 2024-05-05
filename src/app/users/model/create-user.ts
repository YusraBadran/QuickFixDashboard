import { CreatePermission } from './create-permissions';

export class Createusers {
  id!: string;
  firstName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  phoneNumber!: string;
  password!: string;
  confirmPassword!: string;
  userState!: Number;
  roles: any[] = ['admin'];
  permissions: CreatePermission[] = [];
}
