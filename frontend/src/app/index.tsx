import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { allSettled } from "effector";

import { appScope } from "@shared/config";

import { appStarted } from "./model";
import { AppWithProvider } from "./ui";

async function initializeApp() {
  const root = document.getElementById("root")!;

  await allSettled(appStarted, { scope: appScope });

  createRoot(root).render(
    <StrictMode>
      <AppWithProvider />
    </StrictMode>,
  );
}

export default initializeApp;
