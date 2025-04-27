import {createRouter} from '@tanstack/react-router';

import {aboutRoute} from './aboutRoute';
import {authRoute} from './authRoute';
import {homeRoute} from './homeRoute';
import {rootRoute} from './rootRoute';

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, authRoute]);

export const router = createRouter({routeTree});
