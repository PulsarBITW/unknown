import {createQuery} from '@farfetched/core';
import {createEvent, createStore, sample} from 'effector';

import {ModelErrorResponseDto, postApiV1AuthRegister} from '@shared/api';
import {redirectFx, ROUTES} from '@shared/config';
import {createPageStateManager} from '@shared/lib/createPageStateManager';
import {isAxiosError} from '@shared/lib/isAxiosError';

import {SignupFormData} from './signup-schema';

// Queries
const registerUserQuery = createQuery({
  handler: postApiV1AuthRegister,
});

// Events
const formSubmitted = createEvent<SignupFormData>();

// Stores

const $error = createStore<string | null>(null);

const $isLoading = registerUserQuery.$pending;

const signupPageManager = createPageStateManager();

// Logic
$error
  .on(registerUserQuery.$error, (_, error) => {
    if (isAxiosError<ModelErrorResponseDto>(error)) {
      return error.response?.data.error ?? null;
    }

    return null;
  })
  .reset(registerUserQuery.$succeeded, signupPageManager.pageClosed);

sample({
  clock: formSubmitted,
  target: registerUserQuery.start,
});

sample({
  clock: registerUserQuery.$succeeded,
  fn: () => ({to: ROUTES.auth.children.login.absolutePath}),
  target: redirectFx,
});

export const signupPageModel = {
  formSubmitted,
  $isLoading,
  $error,
  signupPageManager,
};
