import {createEffect, createEvent, sample} from 'effector';

import {pause} from '@shared/lib/pause';

import {type CurrentUser, currentUserModel} from '@entities/current-user';

export type Credentials = {
  email: string;
  password: string;
};

// Effects
const authenticateByCredentialsFx = createEffect({
  name: 'authenticateByCredentialsFx',
  handler: async (credentials: Credentials) => {
    await pause(1_000);
    return {token: 'mock-token', credentials};
  },
});

// Events
const login = createEvent<Credentials>();
const logout = createEvent();

// Logic
sample({
  clock: login,
  target: authenticateByCredentialsFx,
});

sample({
  clock: authenticateByCredentialsFx.doneData,
  fn: (data): CurrentUser => ({
    id: '123',
    name: 'John Doe',
    email: data.credentials.email,
  }),
  target: currentUserModel.currentUserChanged,
});

sample({
  clock: logout,
  target: currentUserModel.currentUserReset,
});

export const authModel = {
  login,
  logout,
  authenticateByCredentialsFx,
};
