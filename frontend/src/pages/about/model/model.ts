import {createEffect, createStore, sample} from 'effector';

import {createPageStateManager} from '@shared/lib/createPageStateManager';
import {pause} from '@shared/lib/pause';

export const fetchAboutDataFx = createEffect({
  name: 'fetchAboutDataFx',
  handler: async () => {
    await pause(1_000);
    return {info: 'This is the about page.'};
  },
});

export const aboutPageManager = createPageStateManager({pageName: 'About'});

export const $info = createStore<string>('');

sample({
  clock: aboutPageManager.pageOpened,
  target: fetchAboutDataFx,
});

sample({
  clock: fetchAboutDataFx.doneData,
  fn: (response) => response.info,
  target: $info,
});
