import i18n from 'i18next';
import {
  initReactI18next,
  useTranslation as i18nextUseTranslation,
} from 'react-i18next';

export default (langCode) => {
  if (i18n.isInitialized) {
    return Promise.resolve();
  }

  return i18n
    .use(initReactI18next)
    .init({
      lng: langCode,

      debug: false,

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });
};

export const useTranslation = (namespace, resourceBundle = {}) => {
  Object.entries(resourceBundle).forEach((entry) => {
    i18n.addResourceBundle(entry[0], namespace, entry[1]);
  });

  return i18nextUseTranslation(namespace);
};
