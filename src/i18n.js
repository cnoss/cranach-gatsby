import i18n from 'i18next';
import {
  initReactI18next,
  useTranslation as i18nextUseTranslation,
} from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setLanguage } from '~/store/baseSlice';

export default (langCode) => {
  const dispatch = useDispatch();

  if (i18n.isInitialized) {
    if (i18n.language !== langCode) {
      return i18n.changeLanguage(langCode).then(() => {
        dispatch(setLanguage(langCode));
      });
    }
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
    }).then(() => {
      dispatch(setLanguage(langCode));
    });
};

export const useTranslation = (namespace, resourceBundle = {}) => {
  Object.entries(resourceBundle).forEach((entry) => {
    i18n.addResourceBundle(entry[0], namespace, entry[1]);
  });

  return i18nextUseTranslation(namespace);
};
