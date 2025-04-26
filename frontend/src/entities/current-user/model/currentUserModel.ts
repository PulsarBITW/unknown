import {createEvent, createStore, sample} from 'effector';

import {ModelUserResponseDto} from '@shared/api/requests';

const $currentUser = createStore<ModelUserResponseDto | null>(null);

const currentUserReset = createEvent();
const currentUserChanged = createEvent<ModelUserResponseDto>();

$currentUser.reset(currentUserReset);

sample({
  clock: currentUserChanged,
  target: $currentUser,
});

export const currentUserModel = {
  $currentUser,
  currentUserReset,
  currentUserChanged,
};
