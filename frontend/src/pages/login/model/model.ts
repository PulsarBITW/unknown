import {createEffect, createEvent, createStore, sample} from 'effector';

import {pause} from '@shared/lib/pause';

import {type LoginFormData} from './login-schema';

// Events
const formSubmitted = createEvent<LoginFormData>();

// Effects
const loginFx = createEffect({
  handler: async (data: LoginFormData) => {
    await pause(2_000);
    console.log('@formData', data);
  },
});

// Stores
const $isLoading = createStore(false).on(loginFx.pending, (_, pending) => pending);
const $error = createStore<Error | null>(null);

// Logic
$error.on(loginFx.failData, (_, error) => error).reset(loginFx.done);

sample({
  clock: formSubmitted,
  target: loginFx,
});

export const loginPageModel = {
  formSubmitted,
  $isLoading,
  $error,
};
