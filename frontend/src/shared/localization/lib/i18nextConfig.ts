import {InitOptions} from 'i18next';
import {DetectorOptions} from 'i18next-browser-languagedetector';

import {AppLocales, isLanguageSupported, LocalStorageKeys} from '@shared/config';

import de from './dictionaries/de.json';
import en from './dictionaries/en.json';

function normalizeLanguage(lng: string): string {
  let normalizedLng = lng;

  if (lng.includes('-')) {
    normalizedLng = lng.split('-')[0];
  }

  return isLanguageSupported(normalizedLng) ? normalizedLng : AppLocales.default;
}

const languageDetectorOptions: DetectorOptions = {
  order: ['localStorage', 'navigator'],
  lookupLocalStorage: LocalStorageKeys.APP_LANGUAGE,
  convertDetectedLanguage: normalizeLanguage,
};

export const i18nextConfig: InitOptions = {
  fallbackNS: AppLocales.default,
  debug: true,
  resources: {
    [AppLocales.suppored.en.locale]: {
      translation: en,
    },
    [AppLocales.suppored.de.locale]: {
      translation: de,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  detection: languageDetectorOptions,
};
