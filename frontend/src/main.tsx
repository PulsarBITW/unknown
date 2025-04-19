import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "effector-react";

import App from "@app";

import { appScope } from "@shared/config";

import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider value={appScope}>
      <App />
    </Provider>
  </StrictMode>,
);
