import {createEvent, sample} from 'effector';

import {currentUserModel} from '@entities/currentUser';

export const appStarted = createEvent();

sample({
  clock: appStarted,
  target: currentUserModel.fetchCurrentUserFx,
});
