import {createEvent, createStore} from 'effector';

type CreatePageStateManagerParams = {
  pageName?: string;
};

export function createPageStateManager<T = void>(params?: CreatePageStateManagerParams) {
  const {pageName} = params || {};

  const pageOpened = createEvent<T>();
  const pageClosed = createEvent();

  const $isPageOpen = createStore(false, {name: pageName})
    .on(pageOpened, () => true)
    .on(pageClosed, () => false);

  return {pageOpened, pageClosed, $isPageOpen};
}
