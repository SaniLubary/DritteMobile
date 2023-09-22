import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';

const languages = {
  en: enTranslations,
  es: esTranslations,
};

const fallbackLanguage = 'en';

export const detectUserLanguage = () => {
  const { languageTag } = RNLocalize.findBestLanguageTag(['en', 'es']) || {};
  return languageTag || fallbackLanguage;
};

i18n.use(initReactI18next).init({
  resources: languages,
  lng: detectUserLanguage(),
  compatibilityJSON: 'v3',
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false, // React components can be interpolated
  },
});
