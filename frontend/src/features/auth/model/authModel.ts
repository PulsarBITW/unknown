import {createQuery} from '@farfetched/core';
import {attach, createEffect, createEvent, sample} from 'effector';

import {
  AccessTokenController,
  ModelLoginRequestDto,
  ModelUserResponseDto,
  postApiV1AuthLoginCredentials,
  postApiV1AuthLoginJwt,
  refreshTokenExpired,
} from '@shared/api';

import {currentUserModel} from '@entities/current-user';

import {
  AuthChannelMessage,
  createAuthBroadcastChannelModel,
} from './createAuthBroadcastChannelModel';

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

const removeAccessTokenFx = createEffect({
  handler: AccessTokenController.removeToken,
});

// Events
const login = createEvent<ModelLoginRequestDto>();

/**
 * Triggers user logout and resets authentication state.
 * Subscribe to this event when stores need to be reset during user logout.
 */
const logout = createEvent();

// Stores
const $isAuth = currentUserModel.$currentUser.map((user) => !!user);

// factories
const authBroadcastChannelModel = createAuthBroadcastChannelModel({
  $isAuth,
  $currentUser: currentUserModel.$currentUser,
});

// Logic

// #TODO - refactor
const postLoginMessageFx = attach({
  mapParams: (): AuthChannelMessage => ({
    action: 'LOGIN',
  }),
  effect: authBroadcastChannelModel.postMessageFx,
});
//

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
  target: [currentUserModel.currentUserChanged, postLoginMessageFx],
});

sample({
  clock: authenticateByCredentialsQuery.finished.success,
  fn: ({result}) => result.data.accessToken,
  target: saveAccessTokenFx,
});

sample({
  clock: [refreshTokenExpired, authBroadcastChannelModel.logoutedOutByBroadcastChannel],
  target: logout,
});

/**
 * Broadcast logout action to other app instances
 */
sample({
  clock: logout,
  fn: (): AuthChannelMessage => ({action: 'LOGOUT'}),
  target: authBroadcastChannelModel.postMessageFx,
});

/**
 * Start authenticate by JWT query when logged in by broadcast channel
 */
sample({
  clock: authBroadcastChannelModel.loggedInByBroadcastChannel,
  target: authenticateByJWTQuery.start,
});

/**
 * Reset user data when user logout
 */
sample({
  clock: logout,
  target: [currentUserModel.currentUserReset, removeAccessTokenFx],
});

export const authModel = {
  login,
  logout,
  authenticateByCredentialsQuery,
  authenticateByJWTQuery,
  initAuthBroadcastChannelFx: authBroadcastChannelModel.initAuthBroadcastChannelFx,
  $isAuth,
};
