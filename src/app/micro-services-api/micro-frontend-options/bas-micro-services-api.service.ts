import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslatesService } from '../../shared/translate/translate.service';
import { Tokens } from 'src/app/shared/models/tokens';
import { RefreshToken } from '../models/refresh-token';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/router/router';

@Injectable({
  providedIn: 'root',
})
export class BasMicroServicesApiService {
  route = inject(Router);
  rout = routes;
  token = Tokens;
  refreshTokenTimeout: any;
  refreshTokenRequest: RefreshToken = new RefreshToken();
  constructor(
    public http: HttpClient,
    public translate: TranslatesService //  public messageService: MessageService
  ) {}

  public get apiUrl(): string {
    return env.serverUrl;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      const messageAlert = Swal.mixin({
        buttonsStyling: false,
      });
      if (error.status === 0) {
        messageAlert.fire({
          title: this.translate.getTranslate('errorConnection.title'),
          text: this.translate.getTranslate('errorConnection.message'),
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,
          willClose: () => {
            this.route.navigate([this.rout.signIn]);
            localStorage.removeItem('menu');
            localStorage.setItem('isLogin', 'false');
            localStorage.removeItem('jwt');
          },
          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      if (error.status === 400 && error.error.title === 'ValidationException') {
        Swal.fire({
          title: this.translate.getTranslate('http.error.400'),
          html: `
          <div>

          </div>
          `,
          didOpen: () => {
            const cont = Swal.getHtmlContainer()?.querySelector('div');
            if (cont) {
              cont.innerHTML = '';
              error.error.data.forEach((element: any) => {
                cont.innerHTML += `<p class="text-base">${element.message}</p>`;
              });
            }
          },
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,
          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      if (error.status === 401) {
        messageAlert.fire({
          title: this.translate.getTranslate('http.error.401'),
          text: error.error.detail ?? '',
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,
          willClose: () => {
            this.route.navigate([this.rout.signIn]);
            localStorage.removeItem('menu');
            localStorage.setItem('isLogin', 'false');
            localStorage.removeItem('jwt');
          },
          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      if (error.status === 409) {
        messageAlert.fire({
          // title: this.translate.getTranslate('http.error409.title'),
          text: error.error.data.message ?? error.error.details,
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,
          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      if (error.error.data.statusCode === 400) {
        messageAlert.fire({
          // title: this.translate.getTranslate('http.error409.title'),
          text: error.error.data.message ?? error.error.details,
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,

          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      if (error.error.data.statusCode === 400) {
        messageAlert.fire({
          // title: this.translate.getTranslate('http.error409.title'),
          text: error.error.data.message ?? error.error.details,
          cancelButtonText: this.translate.getTranslate('public.ok'),
          icon: 'error',
          timer: 3000,

          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: true,
          customClass: {
            cancelButton: 'p-button p-button-secondary',
            popup: 'surface-card',
            title: 'text-xl',
            htmlContainer: 'text-base',
          },
        });
      }
      // messageAlert.fire({
      //   title: 'Error!',
      //   text: error.error.detail,

      //   icon: 'error',
      //   confirmButtonText: 'Ok',
      //   timer: 3000,
      //   customClass: {
      //     confirmButton: 'p-button p-button-secondary',
      //     popup: 'surface-card',
      //   },
      // });
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Login
   * @param moduleType `moduleType` the for module type
   * @param headers `headers` the for headers
   * @returns
   */
  public login<T>(
    moduleType: any,
    body?: any,
    operation: string = 'login',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ) {
    return this.http
      .post<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}`,
        body,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Login')),
        map((response: T) => {
          return response;
        })
      );
  }
  public getRefreshToken<T>(
    moduleType: string = 'identity',
    operation: string = 'refresh_token',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ) {
    var token = this.token.refreshToken;
    var refreshToken = this.token.refreshToken;
    this.refreshTokenRequest.accessToken = token;
    this.refreshTokenRequest.refreshToken = refreshToken;
    return this.http
      .post<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}`,
        this.refreshTokenRequest,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('RefreshToken')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   *
   * @param moduleType `moduleType` the for module type
   * @param operation `operation` the for operation method
   * @param version `version` the for version of the api method
   * @param headers `headers` the for headers
   * @returns
   */
  public logout<T>(
    moduleType: string = 'identity',
    operation: string = 'logout',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ) {
    return this.http
      .post<T>(`${env.serverUrl}/api/${moduleType}/${operation}/v${version}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Logout')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Get
   * @param moduleType `moduleType` the for module type
   * @param headers `headers` the for headers
   * @returns
   */
  public get<T>(
    moduleType: any,
    operation: string = 'get_all',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .get<T>(`${env.serverUrl}/api/${moduleType}/${operation}/v${version}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('GetAll')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Look Up
   * @param serviceType `serviceType` the for service type
   * @param moduleType `moduleType` the for module type
   * @param headers `headers` the for headers
   * @returns
   */
  public lookup<T>(
    moduleType: any,
    id?: any,
    operation: string = 'lookup',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .get<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Lookup')),
        map((response: T) => {
          return response;
        })
      );
  }

  /**
   * Get By Id
   * @param moduleType `moduleType` the for module type
   * @param serviceType `serviceType` the for service type
   * @param Id `Id` the for Id
   * @param headers `headers` the for headers
   * @returns
   */
  public getById<T>(
    moduleType: any,
    id: any,
    operation: string = 'get_by_id',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .get<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('GetById')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Get By Id
   * @param moduleType `moduleType` the for module type
   * @param serviceType `serviceType` the for service type
   * @param Id `Id` the for Id
   * @param headers `headers` the for headers
   * @returns
   */
  public getByEmail<T>(
    moduleType: any,
    operation: string = 'get_by_email',
    email: any,
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .get<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?id=${email}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('GetByEmail')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Get By Paging
   * @param moduleType `moduleType` the for module type
   * @param serviceType `serviceType` the for service type
   * @param headers `headers` the for headers
   * @returns
   */
  public getByPage<T>(
    moduleType: any,
    page: number,
    size: number,
    id?: any,
    operation: string = 'get_by_page',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .get<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}&page=${page}&pageSize=${size}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Get')),
        map((response: T) => {
          return response;
        })
      );
  }

  /**
   * Get Post By Paging
   * @param moduleType `moduleType` the for module type
   * @param serviceType `serviceType` the for service type
   * @param headers `headers` the for headers
   * @returns
   */
  public getPageByPost<T>(
    moduleType: any,
    page: number,
    size: number,
    filters: any,
    id?: any,
    operation: string = 'get_By_Page',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .post<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}&page=${page}&pageSize=${size}`,
        filters,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Get')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Post
   * @param moduleType  the for module type
   * @param serviceType  the for service type
   * @param headers  the for headers
   * @param body the for body
   * @returns
   */
  public create<T>(
    moduleType: any,
    body?: any,
    operation: string = 'create',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    return this.http
      .post<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}`,
        body,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>()),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Upload File
   * @param moduleType
   * @param body
   * @param operation
   * @param version
   * @param headers
   * @returns
   */
  public uploadFile<T>(
    companyFolder: string,
    moduleFolder: string,
    fileUpload: FormData,
    operation: string = 'upload',
    version: number = 1
  ): Observable<T> {
    console.log(fileUpload, 'fileUpload');

    // `${env.serverUrl}/api/fileManger/${operation}/v${version}?companyFolder=${companyFolder}&moduleFolder=${moduleFolder}`,
    return this.http
      .post<T>(
        `${env.serverUrl}/api/fileManger/${operation}/v${version}?companyFolder=${companyFolder}&moduleFolder=${moduleFolder}`,
        fileUpload,
        {
          reportProgress: true,
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>()),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Put
   * @param moduleType  the for module type
   * @param serviceType the for service type
   * @param headers  the for headers
   * @param body  the for body
   * @returns
   */
  public update<T>(
    moduleType: any,
    body: any,
    id?: any,
    operation: string = 'update',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .put<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}`,
        body,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Get ${serviceType}`)),
        catchError(this.handleError<T>('Update')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Delete
   * @param serviceType the for service type
   * @param moduleType the for module type
   * @param headers the for headers
   * @param body the for body
   * @returns
   */
  public delete<T>(
    moduleType: any,
    id: any,
    body?: any,
    operation: string = 'delete',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .delete<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}`,

        {
          body,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Delete ${serviceType}`)),
        catchError(this.handleError<T>('Delete')),
        map((response: T) => {
          return response;
        })
      );
  }
  /**
   * Delete
   * @param serviceType the for service type
   * @param moduleType the for module type
   * @param headers the for headers
   * @param body the for body
   * @returns
   */
  public PostDelete<T>(
    moduleType: any,
    id: any,
    body?: any,
    operation: string = 'delete',
    version: number = 1,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ): Observable<T> {
    // this.refreshToken();
    return this.http
      .post<T>(
        `${env.serverUrl}/api/${moduleType}/${operation}/v${version}?Id=${id}`,

        {
          body,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        // tap((newResult: T) => this.log(`Delete ${serviceType}`)),
        catchError(this.handleError<T>('Delete')),
        map((response: T) => {
          return response;
        })
      );
  }
  // /**
  //  * set session storage
  //  * @param key
  //  * @param value
  //  */
  // public setSessionStorage(key: string, value: any) {
  //   sessionStorage.setItem(key + '', JSON.stringify(value));
  // }
}
