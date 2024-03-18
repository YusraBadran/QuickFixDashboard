import { HttpClient } from '@angular/common/http';
import { Inject, InjectionToken } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({ KEY: lang });
  }
}
