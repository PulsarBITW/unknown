import {createEvent, sample} from 'effector';

import {languageModel} from '@shared/localization';

import {authModel} from '@features/auth';

const appStarted = createEvent();

const $isInitialAuthLoading = authModel.authenticateByJWTQuery.$pending;

/**
 * Initialize all core application models that should be activated on application startup.
 */
sample({
  clock: appStarted,
  target: [
    languageModel.init18nextFx,
    authModel.initAuthBroadcastChannelFx,
    authModel.authenticateByJWTQuery.start,
  ],
});

export const appModel = {
  appStarted,
  $isInitialAuthLoading,
};
