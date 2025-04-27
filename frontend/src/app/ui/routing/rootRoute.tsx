import {Container} from '@radix-ui/themes';
import {createRootRoute, Outlet} from '@tanstack/react-router';

import {Header} from '../header';
import {NavigateConnector} from './NavigateConnector';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Container size="2" px="4">
        <Outlet />
      </Container>
      <NavigateConnector />
    </>
  ),
});
