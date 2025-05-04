import {createEvent, createStore, sample} from 'effector';

import {ModelUserResponseDto} from '@shared/api';

const $currentUser = createStore<ModelUserResponseDto | null>(null);

const $fullUserName = $currentUser.map((user) =>
  user ? `${user.firstName} ${user.lastName}` : null,
);

const currentUserReset = createEvent();
const currentUserChanged = createEvent<ModelUserResponseDto>();

$currentUser.reset(currentUserReset);

sample({
  clock: currentUserChanged,
  target: $currentUser,
});

export const currentUserModel = {
  $currentUser,
  $fullUserName,
  currentUserReset,
  currentUserChanged,
};
