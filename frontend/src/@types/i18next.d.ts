import de from '@shared/localization/lib/dictionaries/de.json';
import en from '@shared/localization/lib/dictionaries/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      de: typeof de;
      en: typeof en;
    };
  }
}
