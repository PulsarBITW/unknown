import {createRoute} from '@tanstack/react-router';

import {ROUTES} from '@shared/config';
import {createBoundEvent} from '@shared/lib/createBoundEvent';

import {AuthRoute} from '@features/auth';

import {HomePage, homePageManager} from '@pages/home';

import {rootRoute} from '../rootRoute';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home.absolutePath,
  component: () => (
    <AuthRoute>
      <HomePage />
    </AuthRoute>
  ),
  loader: () => {
    const boundHomePageOpened = createBoundEvent(homePageManager.pageOpened);
    boundHomePageOpened();
  },
  onLeave: () => {
    const boundHomePageClosed = createBoundEvent(homePageManager.pageClosed);
    boundHomePageClosed();
  },
});
