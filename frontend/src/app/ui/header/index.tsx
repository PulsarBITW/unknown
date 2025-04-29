import {Button, Flex, Text} from '@radix-ui/themes';
import {Link} from '@tanstack/react-router';
import {useUnit} from 'effector-react';

import {ROUTES} from '@shared/config';

import {currentUserModel} from '@entities/current-user';

import {authModel} from '@features/auth';

import {UserAvatar} from './UserAvatar';

import styles from './header.module.css';

export const Header = () => {
  const [isAuthenticated, logout, currentUser] = useUnit([
    authModel.$isAuth,
    authModel.logout,
    currentUserModel.$currentUser,
  ]);

  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" px="4" py="3">
        <Link to={ROUTES.home.absolutePath} className={styles.logo}>
          <Text size="4" weight="bold" color="indigo">
            MyApp
          </Text>
        </Link>

        <nav>
          <ul className={styles['nav-list']}>
            <li>
              <Button asChild variant="soft">
                <Link to={ROUTES.home.absolutePath}>Home</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="soft">
                <Link to={ROUTES.about.absolutePath}>About</Link>
              </Button>
            </li>
          </ul>
        </nav>

        {isAuthenticated && currentUser !== null ? (
          <UserAvatar currentUser={currentUser} logout={logout} />
        ) : (
          <Button asChild color="blue">
            <Link to={ROUTES.auth.children.login.absolutePath}>Login</Link>
          </Button>
        )}
      </Flex>
    </header>
  );
};
