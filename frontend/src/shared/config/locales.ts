export const AppLocales = {
  default: 'en',
  supported: {
    en: {
      locale: 'en',
    },
    de: {
      locale: 'de',
    },
  },
} as const;

export type SupportedLanguagesUnion = keyof typeof AppLocales.supported;

export const isLanguageSupported = (lng: string): lng is SupportedLanguagesUnion => {
  return AppLocales.supported[lng as keyof typeof AppLocales.supported] !== undefined;
};
