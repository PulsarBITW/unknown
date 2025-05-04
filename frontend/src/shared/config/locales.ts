export const AppLocales = {
  default: 'en',
  suppored: {
    en: {
      locale: 'en',
    },
    de: {
      locale: 'de',
    },
  },
} as const;

export type SupportedLanguagesUnion = keyof typeof AppLocales.suppored;

export const isLanguageSupported = (lng: string): lng is SupportedLanguagesUnion => {
  return AppLocales.suppored[lng as keyof typeof AppLocales.suppored] !== undefined;
};
