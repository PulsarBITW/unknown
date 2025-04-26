import {createEvent, createStore, sample} from 'effector';

import {ModelErrorResponseDto} from '@shared/api/requests';
import {createPageStateManager} from '@shared/lib/createPageStateManager';
import {isAxiosError} from '@shared/lib/isAxiosError';

import {authModel} from '@features/auth';

import {LoginFormData} from './login-schema';

// Events
const formSubmitted = createEvent<LoginFormData>();

// Stores

const $error = createStore<string | null>(null);

const $isLoading = authModel.authenticateByCredentialsQuery.$pending;

const loginPageManager = createPageStateManager();

// Logic
$error
  .on(authModel.authenticateByCredentialsQuery.$error, (_, error) => {
    if (isAxiosError<ModelErrorResponseDto>(error)) {
      return error.response?.data.error ?? null;
    }

    return null;
  })
  .reset(authModel.authenticateByCredentialsQuery.$succeeded, loginPageManager.pageClosed);

sample({
  clock: formSubmitted,
  target: authModel.authenticateByCredentialsQuery.start,
});

export const loginPageModel = {
  formSubmitted,
  $isLoading,
  $error,
  loginPageManager,
};
