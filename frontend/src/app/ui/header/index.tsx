import {Avatar, Flex, Text} from '@radix-ui/themes';
import {Link} from '@tanstack/react-router';

import {ROUTES} from '@shared/config';

import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" px="4" py="3">
        <Text size="4" weight="bold" color="indigo">
          MyApp
        </Text>

        <nav>
          <ul>
            <li>
              <Link to={ROUTES.home.absolutePath}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.about.absolutePath}>About</Link>
            </li>
            <li>
              <Link to={ROUTES.auth.children.login.absolutePath}>Login</Link>
            </li>
          </ul>
        </nav>

        <Flex align="center" gap="2">
          <Avatar
            alt="User Avatar"
            size="3"
            fallback={<span>You</span>}
            src="https://github.com/shadcn.png"
          />
        </Flex>
      </Flex>
    </header>
  );
};
