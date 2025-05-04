import {useTranslation} from 'react-i18next';
import {Select} from '@radix-ui/themes';

import {AppLocales, SupportedLanguagesUnion} from '@shared/config';

const LANGUAGES_ITEMS: {label: string; value: SupportedLanguagesUnion}[] = [
  {
    label: AppLocales.supported.en.locale.toUpperCase(),
    value: AppLocales.supported.en.locale satisfies SupportedLanguagesUnion,
  },
  {
    label: AppLocales.supported.de.locale.toUpperCase(),
    value: AppLocales.supported.de.locale satisfies SupportedLanguagesUnion,
  },
];

export const LanguageSwitcher = () => {
  const {i18n} = useTranslation();

  return (
    <Select.Root
      defaultValue={i18n.language}
      onValueChange={(value: SupportedLanguagesUnion) => i18n.changeLanguage(value)}
    >
      <Select.Trigger variant="surface" />
      <Select.Content position="popper">
        {LANGUAGES_ITEMS.map(({value, label}) => (
          <Select.Item key={value} value={value}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
