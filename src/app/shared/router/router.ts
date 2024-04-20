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
    return this.auth + '/login';
  }

  // core pages child routes *ends*

  /**
   * Services routes
   */
  public static get servicesType(): string {
    return this.baseUrl + '/services-type/';
  }
  public static get servicesCreate(): string {
    return this.servicesType + '/create/';
  }
  public static get servicesDetails(): string {
    return this.servicesType + '/details/';
  }
  public static get ServicesUpdate(): string {
    return this.servicesType + '/update/';
  }
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
  /**
   * Category routes
   */
  public static get categoriesItem(): string {
    return this.baseUrl + '/categoriesItem/';
  }
  public static get categoryItemCreate(): string {
    return this.categoriesItem + '/create/';
  }
  public static get categoryItemDetails(): string {
    return this.categoriesItem + '/details/';
  }
  public static get categoryItemUpdate(): string {
    return this.categoriesItem + '/update/';
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

  /**
   * Center routes
   */

  public static get centers(): string {
    return this.baseUrl + '/centers/';
  }
  public static get centersCreate(): string {
    return this.centers + '/create/';
  }
  public static get centersDetails(): string {
    return this.centers + '/details/';
  }
  public static get centersUpdate(): string {
    return this.centers + '/update/';
  }
}
