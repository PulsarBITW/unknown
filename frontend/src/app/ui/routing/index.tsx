import {createRootRoute, createRoute, createRouter, Outlet} from '@tanstack/react-router';

import {Header} from '@app/ui/header';

import {ROUTES} from '@shared/config';
import {createBoundEvent} from '@shared/lib/createBoundEvent';

import {AboutPage, aboutPageManager} from '@pages/about';
import {HomePage, homePageManager} from '@pages/home';
import {LoginPage, loginPageModel} from '@pages/login';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home,
  component: HomePage,
  loader: () => {
    const boundHomePageOpened = createBoundEvent(homePageManager.pageOpened);
    boundHomePageOpened();
  },
  onLeave: () => {
    const boundHomePageClosed = createBoundEvent(homePageManager.pageClosed);
    boundHomePageClosed();
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.about,
  component: AboutPage,
  loader: () => {
    const boundAboutPageOpened = createBoundEvent(aboutPageManager.pageOpened);
    boundAboutPageOpened();
  },
  onLeave: () => {
    const boundAboutPageClosed = createBoundEvent(aboutPageManager.pageClosed);
    boundAboutPageClosed();
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.login,
  component: LoginPage,
  loader: () => {
    const boundLoginPageOpened = createBoundEvent(loginPageModel.loginPageManager.pageOpened);
    boundLoginPageOpened();
  },
  onLeave: () => {
    const boundLoginPageClosed = createBoundEvent(loginPageModel.loginPageManager.pageClosed);
    boundLoginPageClosed();
  },
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, loginRoute]);

export const router = createRouter({routeTree});
