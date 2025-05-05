import {initReactI18next} from 'react-i18next';
import {NavigateOptions} from '@tanstack/react-router';
import {createEffect, createEvent, sample, scopeBind} from 'effector';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import {appScope, redirectFx, SupportedLanguagesUnion} from '@shared/config';

import {i18nextConfig} from '../lib/i18nextConfig';

const __INTERNAL_API = {
  /**
   * Internal event for synchronizing i18next with Effector units.
   * DO NOT call directly outside this model.
   * Used exclusively for computed events and maintaining state consistency.
   * For changing language, use i18next.changeLanguage() or changeLanguageFx instead.
   */
  __changeLanguage: createEvent<string>(),
};

const init18nextFx = createEffect(() => {
  i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init(i18nextConfig)
    .then(() => {
      document.documentElement.setAttribute('lang', i18next.language);
    });

  i18next.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
    scopeBind(__INTERNAL_API.__changeLanguage, {scope: appScope})(lng);
  });
});

const changeLanguageFx = createEffect((lng: SupportedLanguagesUnion) => {
  i18next.changeLanguage(lng);
});

//                      create computed event
// const languageChanged = sample({clock: __INTERNAL_API.__changeLanguage});

sample({
  clock: __INTERNAL_API.__changeLanguage,
  fn: (): NavigateOptions => ({reloadDocument: true}),
  target: redirectFx,
});

export const languageModel = {
  init18nextFx,
  changeLanguageFx,
  // languageChanged,
};
