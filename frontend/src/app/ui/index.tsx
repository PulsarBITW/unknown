import { Provider } from "effector-react";

import { appScope } from "@shared/config";

import { App } from "./app";

export const AppWithProvider = () => {
  return (
    <Provider value={appScope}>
      <App />
    </Provider>
  );
};
