import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { routes } from '../../router/router';
import { TranslatesService } from '../../translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpRequestMessageService {
  public routes = routes;
  constructor(private rout: Router, private translate: TranslatesService) {}
  // Delete Data
  createCompanySuccess(name?: string) {
    const messageAlert = Swal.mixin({
      customClass: {
        confirmButton: 'p-button p-button-success',
        cancelButton: 'me-2 p-button p-button-danger',
        popup: 'surface-card',
      },
      buttonsStyling: false,
    });
    messageAlert
      .fire({
        title: this.translate.getTranslate('auth.singUp.congratulations'),
        text: this.translate.getTranslate('auth.singUp.companyCreated'),
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: this.translate.getTranslate('auth.goToLogin'),
        reverseButtons: true,
        timer: 2000,
        customClass: {
          popup: 'surface-card',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.rout.navigate([routes.signIn]);
        }
      });
  }
  createUserSuccess(name?: string) {
    const messageAlert = Swal.mixin({
      customClass: {
        confirmButton: 'p-button p-button-success',
        cancelButton: 'me-2 p-button p-button-danger',
        popup: 'surface-card',
      },
      buttonsStyling: false,
    });
    messageAlert
      .fire({
        title: this.translate.getTranslate('auth.singUp.congratulations'),
        text: this.translate.getTranslate('auth.singUp.accountCreated'),
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: this.translate.getTranslate('auth.goToLogin'),
        reverseButtons: true,
        timer: 2000,
        customClass: {
          popup: 'surface-card',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.rout.navigate([routes.signIn]);
        }
      });
  }
}
