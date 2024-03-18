import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslatesService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    const browserLang = this.translate.getBrowserLang()!;
    if (
      localStorage.getItem('lang') == null ||
      localStorage.getItem('lang') == undefined
    ) {
      this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'ar');
      localStorage.setItem('lang', browserLang);
      this.translate.use(browserLang);
    }

    if (localStorage.getItem('lang')) {
      var lang = localStorage.getItem('lang');
      this.translate.use(lang!);
    }
  }
  /**
   * Translate
   *
   * @param {Locale} args
   */
  translateLang(lang: string): void {
    // reload page after change language
    window.location.reload();
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
  // get translate
  getTranslate(key: string): string {
    let value!: string;
    this.translate.get(key).subscribe((res: string) => {
      value = res;
    });
    return value;
  }
}
