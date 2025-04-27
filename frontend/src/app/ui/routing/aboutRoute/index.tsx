import {createRoute} from '@tanstack/react-router';

import {ROUTES} from '@shared/config';
import {createBoundEvent} from '@shared/lib/createBoundEvent';

import {AuthRoute} from '@features/auth';

import {AboutPage, aboutPageManager} from '@pages/about';

import {rootRoute} from '../rootRoute';

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.about.absolutePath,
  component: () => (
    <AuthRoute>
      <AboutPage />
    </AuthRoute>
  ),
  loader: () => {
    const boundAboutPageOpened = createBoundEvent(aboutPageManager.pageOpened);
    boundAboutPageOpened();
  },
  onLeave: () => {
    const boundAboutPageClosed = createBoundEvent(aboutPageManager.pageClosed);
    boundAboutPageClosed();
  },
});
