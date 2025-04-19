import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { ROUTES } from "@shared/config";
import { createBoundEvent } from "@shared/lib/createBoundEvent";

import { HomePage, homePageOpened } from "@pages/home";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home,
  component: HomePage,
  loader: () => {
    const boundHomePageOpened = createBoundEvent(homePageOpened);
    boundHomePageOpened({ id: "1" });
  },
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });
