import {useTranslation} from 'react-i18next';
import {Button, Flex, Text} from '@radix-ui/themes';
import {Link} from '@tanstack/react-router';
import {useUnit} from 'effector-react';

import {ROUTES} from '@shared/config';
import {LanguageSwitcher} from '@shared/localization';

import {currentUserModel} from '@entities/current-user';

import {authModel} from '@features/auth';

import {UserAvatar} from './UserAvatar';

import styles from './header.module.css';

export const Header = () => {
  const {t} = useTranslation();

  const [isAuthenticated, logout, fullUserName] = useUnit([
    authModel.$isAuth,
    authModel.logout,
    currentUserModel.$fullUserName,
  ]);

  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" px="4" py="3">
        <Link to={ROUTES.home.absolutePath} className={styles.logo}>
          <Text size="4" weight="bold" color="indigo">
            {t('navigation.myApp')}
          </Text>
        </Link>

        <nav>
          <ul className={styles['nav-list']}>
            <li>
              <Button asChild variant="soft">
                <Link to={ROUTES.home.absolutePath}>{t('navigation.home')}</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="soft">
                <Link to={ROUTES.about.absolutePath}>{t('navigation.about')}</Link>
              </Button>
            </li>
          </ul>
        </nav>

        <Flex align="center" gap="3">
          <LanguageSwitcher />

          {isAuthenticated && fullUserName !== null ? (
            <UserAvatar fullUserName={fullUserName} logout={logout} />
          ) : (
            <Button asChild color="blue">
              <Link to={ROUTES.auth.children.login.absolutePath}>{t('auth.login')}</Link>
            </Button>
          )}
        </Flex>
      </Flex>
    </header>
  );
};
