import {useTranslation} from 'react-i18next';

interface TranslationExampleProps {
  username: string;
}

export const TranslationExample = ({username}: TranslationExampleProps) => {
  const {t} = useTranslation();

  return <div>{t('translationExample.welcome', {username})}</div>;
};
