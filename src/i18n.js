import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

import { withPrefix } from 'gatsby';

export default (langCode) => {
  if (i18n.isInitialized) {
    return;
  }

  i18n
    .use(initReactI18next)
    .use(i18nextXHRBackend)
    .init({
      backend: {
        loadPath: withPrefix('/locales/{{lng}}/{{ns}}.json'),
      },

      lng: langCode,
      fallbackLng: 'en',

      debug: false,

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });
};
