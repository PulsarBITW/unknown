import {createEvent, sample} from 'effector';

import {currentUserModel} from '@entities/current-user';

export const appStarted = createEvent();

sample({
  clock: appStarted,
  target: currentUserModel.fetchCurrentUserFx,
});
