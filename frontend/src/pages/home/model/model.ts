import { createEffect, createEvent, createStore, sample } from "effector";

import { pause } from "@shared/lib/pause";

export const fetchMockDataFx = createEffect({
  name: "fetchMockDataFx",
  handler: async () => {
    await pause(3_000);
    return { message: "success" };
  },
});

export const homePageOpened = createEvent<{ id: string }>();

export const $message = createStore<string>("");

sample({
  clock: homePageOpened,
  target: fetchMockDataFx,
});

sample({
  clock: fetchMockDataFx.doneData,
  fn: (response) => response.message,
  target: $message,
});
