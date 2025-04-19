import {EventCallable, scopeBind} from 'effector';

import {appScope} from '@shared/config';

export function createBoundEvent<T>(event: EventCallable<T>): (payload: T) => void {
  return scopeBind(event, {scope: appScope});
}
