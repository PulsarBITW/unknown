import {createEffect, createEvent, createStore, sample} from 'effector';

import {pause} from '@shared/lib/pause';

import {CurrentUser} from './types';

const fetchCurrentUserFx = createEffect({
  name: 'fetchCurrentUserFx',
  handler: async (): Promise<CurrentUser> => {
    await pause(2_000);
    return {
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      id: Math.round(Math.random() * 10000).toString(),
      login: 'johndoe',
    };
  },
});

const $currentUser = createStore<CurrentUser | null>(null);

const currentUserReset = createEvent();
const currentUserChanged = createEvent<CurrentUser>();

$currentUser.reset(currentUserReset);

sample({
  clock: fetchCurrentUserFx.doneData,
  target: currentUserChanged,
});

sample({
  clock: currentUserChanged,
  target: $currentUser,
});

export const currentUserModel = {
  fetchCurrentUserFx,
  $currentUser,
};
