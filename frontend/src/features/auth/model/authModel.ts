import {createQuery} from '@farfetched/core';
import {createEvent, sample} from 'effector';

import type {ModelLoginRequestDto, ModelUserResponseDto} from '@shared/api/requests';
import {postApiV1AuthLoginCredentials} from '@shared/api/requests';

import {currentUserModel} from '@entities/current-user';

// Farfetched query for authentication by credentials
export const authenticateByCredentialsQuery = createQuery({
  handler: postApiV1AuthLoginCredentials,
});

// Events
const login = createEvent<ModelLoginRequestDto>();
const logout = createEvent();

// Logic
sample({
  clock: login,
  target: authenticateByCredentialsQuery.start,
});

sample({
  clock: authenticateByCredentialsQuery.finished.success,
  fn: ({result}): ModelUserResponseDto => result.data,
  target: currentUserModel.currentUserChanged,
});

sample({
  clock: logout,
  target: currentUserModel.currentUserReset,
});

export const authModel = {
  login,
  logout,
  authenticateByCredentialsQuery,
};
