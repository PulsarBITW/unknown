import {createEvent, sample} from 'effector';

import {authModel} from '@features/auth';

const appStarted = createEvent();

const $isInitialAuthLoading = authModel.authenticateByJWTQuery.$pending;

sample({
  clock: appStarted,
  target: authModel.authenticateByJWTQuery.start,
});

export const appModel = {
  appStarted,
  $isInitialAuthLoading,
};
