export class routes {
  private static base = '';

  public static get baseUrl(): string {
    return this.base;
  }
  // auth routes
  public static get auth(): string {
    return this.baseUrl + '/auth';
  }
  public static get signIn(): string {
    return this.auth + '/sing-in';
  }
  public static get userSignUp(): string {
    return this.auth + '/sing-up-user';
  }
  public static get companySignUp(): string {
    return this.auth + '/sing-up-company';
  }
  public static get companyCompSignUp(): string {
    return this.companySignUp + '/company-sing-up';
  }
  public static get userCompSignUp(): string {
    return this.companySignUp + '/user-sing-up';
  }
  public static get addressCompSignUp(): string {
    return this.companySignUp + '/address-sing-up';
  }
  // core pages child routes *ends*
  /**
   * Company routes
   */
  public static get company(): string {
    return this.baseUrl + '/company';
  }
  public static get companyCreate(): string {
    return this.company + '/create';
  }
  public static get companyDetails(): string {
    return this.company + '/details/';
  }
  public static get CompanyUpdate(): string {
    return this.company + '/update/';
  }
  /**
   * Branches routes
   */
  public static get branches(): string {
    return this.baseUrl + '/branch/';
  }
  public static get branchesCreate(): string {
    return this.branches + '/create/';
  }
  public static get branchesDetails(): string {
    return this.branches + '/details/';
  }
  public static get BranchesUpdate(): string {
    return this.branches + '/update/';
  }
  /**
   * Services routes
   */
  public static get services(): string {
    return this.baseUrl + '/service/';
  }
  public static get servicesCreate(): string {
    return this.services + '/create/';
  }
  public static get servicesDetails(): string {
    return this.services + '/details/';
  }
  public static get ServicesUpdate(): string {
    return this.services + '/update/';
  }
  /**
   * Units routes
   */
  public static get units(): string {
    return this.baseUrl + '/units/';
  }
  public static get unitsCreate(): string {
    return this.units + '/create/';
  }
  public static get unitsDetails(): string {
    return this.units + '/details/';
  }
  public static get UnitsUpdate(): string {
    return this.units + '/update/';
  }
  // core pages child routes *ends*
  /**
   * Category routes
   */
  public static get categories(): string {
    return this.baseUrl + '/categories/';
  }
  public static get categoryCreate(): string {
    return this.categories + '/create/';
  }
  public static get categoryDetails(): string {
    return this.categories + '/details/';
  }
  public static get categoryUpdate(): string {
    return this.categories + '/update/';
  }
  // core pages child routes *ends*
  // Setting pages child routes *starts*
  /**
   * Users routes
   */
  public static get users(): string {
    return this.baseUrl + '/users/';
  }
  public static get usersCreate(): string {
    return this.users + '/create/';
  }
  public static get usersDetails(): string {
    return this.users + '/details/';
  }
  public static get usersUpdate(): string {
    return this.users + '/update/';
  }
}
