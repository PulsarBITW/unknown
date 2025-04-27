import {createQuery} from '@farfetched/core';
import {createEffect, createEvent, sample} from 'effector';

import {
  AccessTokenController,
  ModelLoginRequestDto,
  ModelUserResponseDto,
  postApiV1AuthLoginCredentials,
  postApiV1AuthLoginJwt,
} from '@shared/api';

import {currentUserModel} from '@entities/current-user';

// Queries
const authenticateByCredentialsQuery = createQuery({
  handler: postApiV1AuthLoginCredentials,
});

const authenticateByJWTQuery = createQuery({
  handler: postApiV1AuthLoginJwt,
});

// Effects
const saveAccessTokenFx = createEffect({
  handler: (token: string) => {
    AccessTokenController.saveToken(token);
  },
});

// Events
const login = createEvent<ModelLoginRequestDto>();
const logout = createEvent();

// Stores
const $isAuth = currentUserModel.$currentUser.map((user) => !!user);

// Logic
sample({
  clock: [authenticateByCredentialsQuery.finished.success, authenticateByJWTQuery.finished.success],
  fn: ({result}): ModelUserResponseDto => {
    const {email, firstName, id, lastName} = result.data;

    return {
      email,
      firstName,
      id,
      lastName,
    };
  },
  target: currentUserModel.currentUserChanged,
});

sample({
  clock: authenticateByCredentialsQuery.finished.success,
  fn: ({result}) => result.data.accessToken,
  target: saveAccessTokenFx,
});

sample({
  clock: logout,
  target: currentUserModel.currentUserReset,
});

export const authModel = {
  login,
  logout,
  authenticateByCredentialsQuery,
  authenticateByJWTQuery,
  $isAuth,
};
