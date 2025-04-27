import {createEvent, sample} from 'effector';

import {authModel} from '@features/auth';

export const appStarted = createEvent();

sample({
  clock: appStarted,
  target: authModel.authenticateByJWTQuery.start,
});
