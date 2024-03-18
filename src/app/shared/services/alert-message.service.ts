import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslatesService } from '../translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  public isConfirm: BehaviorSubject<any>;
  public closeLoader: BehaviorSubject<boolean>;
  constructor(public translate: TranslatesService) {
    this.isConfirm = new BehaviorSubject(false);
    this.closeLoader = new BehaviorSubject(false);
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 p-button p-button-danger',
        popup: 'surface-card',
      },
      buttonsStyling: false,
    });
  }
  Loader() {
    this.closeLoader.next(false);
    Swal.fire({
      html: '<div class="loader"></div>',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
      willClose: () => {
        this.closeLoader.next(true);
      },
      background: 'none',
      customClass: {
        htmlContainer: 'h-10rem flex justify-center items-center',
      },
    });
  }
  msgCancel() {
    Swal.fire({
      title: this.translate.getTranslate('public.cancelled'),
      text: this.translate.getTranslate('public.cancelledMessage'),
      icon: 'error',
      customClass: {
        popup: 'surface-card',
      },
    });
  }
  msSessionExpired() {
    return Swal.fire({
      title: this.translate.getTranslate('public.error'),
      text: this.translate.getTranslate('public.sessionExpired'),
      timer: 2000,
      icon: 'error',
      customClass: {
        popup: 'surface-card',
      },
    })
      .then(function (result) {
        return result.value;
      })
      .catch((e) => {
        return false;
      });
  }
  msgError(mes = '') {
    Swal.fire(this.translate.getTranslate('public.error'), mes, 'error');
  }
  msgSuccess() {
    return Swal.fire({
      title: this.translate.getTranslate('public.deleted'),
      text: this.translate.getTranslate('public.deleteSuccess'),
      icon: 'success',
      timer: 2000,
      customClass: {
        popup: 'surface-card',
      },
    }).then(function (result) {
      return true;
    });
  }
  msgQuestion() {
    return Swal.fire({
      title: this.translate.getTranslate('public.are_you_sure'),
      text: this.translate.getTranslate('public.deleteConfirm'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.getTranslate('public.deleteConfirmYes'),
      cancelButtonText: this.translate.getTranslate('public.deleteConfirmNo'),
      reverseButtons: true,
      customClass: {
        popup: 'surface-card',
      },
    })
      .then(function (result) {
        return result.value;
      })
      .catch((e) => {
        return false;
      });
  }
  saveSuccess() {
    const messageAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 p-button p-button-danger',
        popup: 'surface-card',
      },
      buttonsStyling: false,
    });
    messageAlert.fire({
      text: this.translate.getTranslate('public.saved'),
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      reverseButtons: true,
      timer: 2000,
      customClass: {
        popup: 'surface-card',
      },
    });
  }
  // Delete Data
  deleteBtn() {
    Swal.fire({
      title: this.translate.getTranslate('public.are_you_sure'),
      text: this.translate.getTranslate('public.deleteConfirm'),
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: this.translate.getTranslate('public.deleteConfirmYes'),
      cancelButtonText: this.translate.getTranslate('public.deleteConfirmNo'),
      reverseButtons: true,
      customClass: {
        popup: 'surface-card',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: this.translate.getTranslate('public.deleted'),
          text: this.translate.getTranslate('public.deleteSuccess'),
          icon: 'success',
          customClass: {
            popup: 'surface-card',
          },
        });
        this.isConfirm.next(true);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.isConfirm.next(false);
        Swal.fire({
          title: this.translate.getTranslate('public.cancelled'),
          text: this.translate.getTranslate('public.cancelledMessage'),
          icon: 'error',
          customClass: {
            popup: 'surface-card',
          },
        });
      }
    });
  }
  addressPositionRequired() {
    Swal.fire({
      title: this.translate.getTranslate('public.error'),
      text: this.translate.getTranslate('address.errorAddress'),
      icon: 'warning',
      timer: 2000,
      customClass: {
        popup: 'surface-card',
      },
    });
  }
}
