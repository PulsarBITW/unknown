import {createEvent, createStore, sample} from 'effector';

import {createPageStateManager} from '@shared/lib/createPageStateManager';

import {authModel, type Credentials} from '@features/auth';

// Events
const formSubmitted = createEvent<Credentials>();

// Stores
const $isLoading = createStore(false).on(
  authModel.authenticateByCredentialsFx.pending,
  (_, pending) => pending,
);
const $error = createStore<Error | null>(null);

const loginPageManager = createPageStateManager();

// Logic
$error
  .on(authModel.authenticateByCredentialsFx.failData, (_, error) => error)
  .reset(authModel.authenticateByCredentialsFx.done, loginPageManager.pageClosed);

sample({
  clock: formSubmitted,
  target: authModel.authenticateByCredentialsFx,
});

export const loginPageModel = {
  formSubmitted,
  $isLoading,
  $error,
  loginPageManager,
};
