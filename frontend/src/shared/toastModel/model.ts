import {createEffect} from 'effector';

import {toast} from '@shared/ui/toaster';

const toastFx = createEffect({
  handler: toast,
});

export const toastModel = {
  toastFx,
};
