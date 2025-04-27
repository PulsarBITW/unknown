import {Card, Container, Flex, TabNav} from '@radix-ui/themes';
import {Link, Outlet, useLocation} from '@tanstack/react-router';

import {ROUTES} from '@shared/config';

import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  const {pathname} = useLocation();

  return (
    <Container px="4" maxWidth="400px" pt="48px">
      <Card className={styles['card-shadow']}>
        <TabNav.Root>
          {Links.map((link) => (
            <TabNav.Link active={pathname === link.to} key={link.to} asChild>
              <Link to={link.to}>{link.label}</Link>
            </TabNav.Link>
          ))}
        </TabNav.Root>
        <Flex px="4" py="4" justify="center">
          <Outlet />
        </Flex>
      </Card>
    </Container>
  );
};

const Links = [
  {to: ROUTES.auth.children.login.absolutePath, label: 'Login'},
  {to: ROUTES.auth.children.signup.absolutePath, label: 'Signup'},
];
