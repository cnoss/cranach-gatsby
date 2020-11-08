
import { makeAutoObservable } from 'mobx';
import i18n from '~/i18n';

export default class UI {
  lang = 'en'

  constructor() {
    makeAutoObservable(this);
  }


  /* Actions */

  setLanguage(lang) {
    this.lang = lang;
    i18n(lang);
  }
}
