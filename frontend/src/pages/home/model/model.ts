import {createEffect, createStore, sample} from 'effector';

import {createPageStateManager} from '@shared/lib/createPageStateManager';
import {pause} from '@shared/lib/pause';

export const fetchMockDataFx = createEffect({
  name: 'fetchMockDataFx',
  handler: async () => {
    await pause(3_000);
    return {message: 'success'};
  },
});

export const homePageManager = createPageStateManager({pageName: 'Home'});

export const $message = createStore<string>('');

sample({
  clock: homePageManager.pageOpened,
  target: fetchMockDataFx,
});

sample({
  clock: fetchMockDataFx.doneData,
  fn: (response) => response.message,
  target: $message,
});
