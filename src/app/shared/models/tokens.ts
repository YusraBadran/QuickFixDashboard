export class Tokens {
  /**
   * @description Check if the user is logged in
   */
  public static get isLogin(): boolean {
    let jwt = localStorage.getItem('jwt') ?? null;
    if (jwt == '' || jwt == undefined || jwt == null) {
      return false;
    }
    return true;
  }
  /**
   * @description extract token data from jwt local storage by decoding it
   */
  public static get tokenData(): any {
    if (this.isLogin) {
      let jwt = localStorage.getItem('jwt') ?? '';
      let _extractJwt = jwt.split('.')[1];
      let _atobJwt = atob(_extractJwt);
      let _jwt = JSON.parse(_atobJwt);
      return _jwt;
    }
    return '';
  }
  /**
   * @description get the user id from token data
   */
  public static get UserName(): string {
    return this.tokenData.unique_name;
  }
  /**
   * @description get the user id from token data
   */
  public static get UserId(): string {
    return this.tokenData.nameid;
  }
  /**
   * @description get all roles from token data
   */
  public static get allRole(): string[] {
    let isLogin = this.isLogin;
    return this.isLogin
      ? this.tokenData[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      : false;
  }
  /**
   * @description check if the user has a specific role
   * @param role
   */
  public static isRole(role: any): boolean {
    return this.isLogin ? this.allRole.includes(role) : false;
  }
  /**
   * @description get the token from local storage
   */
  public static get token(): string {
    var jwt = localStorage.getItem('jwt') ?? '';
    var token = jwt.replace(/['"]+/g, '');
    return token;
  }
  /**
   * @description get the refresh token from token data
   */
  public static get refreshToken(): string {
    return this.tokenData.refreshToken;
  }
  public static get expireTokenTime(): any {
    return this.tokenData.expireTime;
  }
  /**
   * @description set the token in local storage
   * @param jwt
   */
  public static setToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('isLogin', 'true');
  }
  /**
   * @description remove the token from local storage
   */
  public static removeToken(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('menu');
    localStorage.removeItem('permissions');
  }
  /**
   * @description set the menu in local storage
   * @param menu
   */
  public static setMenu(menu: any): void {
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  /**
   * @description get the menu from local storage
   * @param menu
   */
  public static get getMenu(): any {
    return JSON.parse(localStorage.getItem('menu') ?? '');
  }
  /**
   * @description set the permissions in local storage
   * @param permissions
   */
  public static setPermissions(permissions: any): void {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }
  /**
   * @description get the permissions from local storage
   * @param permissions
   */
  public static getPermissions(hashName: string): any {
    let permission = localStorage.getItem('permissions') ?? null;
    if (permission == null && permission == undefined) {
      return null;
    }
    let permissions = JSON.parse(permission);
    let permissionPage = permissions.filter(
      (x: any) => x.hashName == hashName
    )[0];
    if (
      permissionPage == null ||
      permission == undefined ||
      permissionPage == -1
    ) {
      return null;
    }
    return permissionPage;
  }
}
