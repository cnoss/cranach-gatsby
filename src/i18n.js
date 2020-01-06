import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

import { withPrefix } from 'gatsby';

export default (langCode) => {
  i18n
    .use(initReactI18next)
    .use(i18nextXHRBackend)
    .init({
      backend: {
        loadPath: withPrefix('/locales/{{lng}}/{{ns}}.json'),
      },

      lng: langCode,
      fallbackLng: 'en',

      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false,
      },


      react: {
        useSuspense: false,
      },
    });
};
