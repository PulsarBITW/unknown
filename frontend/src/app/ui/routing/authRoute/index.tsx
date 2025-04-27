import {createRoute, Navigate} from '@tanstack/react-router';

import {ROUTES} from '@shared/config';
import {createBoundEvent} from '@shared/lib/createBoundEvent';

import {UnauthRoute} from '@features/auth';

import {LoginPage, loginPageModel} from '@pages/login';
import {SignupPage, signupPageModel} from '@pages/signup';

import {rootRoute} from '../rootRoute';
import {AuthLayout} from './layout';

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.auth.absolutePath,
  component: () => (
    <UnauthRoute>
      <AuthLayout />
    </UnauthRoute>
  ),
  loader: () => {
    const boundLoginPageOpened = createBoundEvent(loginPageModel.loginPageManager.pageOpened);
    boundLoginPageOpened();
  },
  onLeave: () => {
    const boundLoginPageClosed = createBoundEvent(loginPageModel.loginPageManager.pageClosed);
    boundLoginPageClosed();
  },
});

const authIndexRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/',
  component: () => <Navigate to={ROUTES.auth.children.login.absolutePath} />,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.children.login.lastPath,
  component: () => <LoginPage />,
  loader: () => {
    const boundLoginPageOpened = createBoundEvent(loginPageModel.loginPageManager.pageOpened);
    boundLoginPageOpened();
  },
  onLeave: () => {
    const boundLoginPageClosed = createBoundEvent(loginPageModel.loginPageManager.pageClosed);
    boundLoginPageClosed();
  },
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.children.signup.lastPath,
  component: () => <SignupPage />,
  loader: () => {
    const boundLoginPageOpened = createBoundEvent(signupPageModel.signupPageManager.pageOpened);
    boundLoginPageOpened();
  },
  onLeave: () => {
    const boundLoginPageClosed = createBoundEvent(signupPageModel.signupPageManager.pageClosed);
    boundLoginPageClosed();
  },
});

authRoute.addChildren([authIndexRoute, loginRoute, signupRoute]);

export {authRoute};
