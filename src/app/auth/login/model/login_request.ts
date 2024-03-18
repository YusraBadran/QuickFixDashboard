export class LogInRequest {
  userNameOrEmail!: string;
  remember: boolean = true;
  password!: string;
}
