type RoutesPattern = {
  [key: string]: {
    absolutePath: string;
    lastPath: string;
    children?: RoutesPattern;
  };
};

export const ROUTES = {
  home: {
    absolutePath: '/',
    lastPath: '/',
  },
  about: {
    absolutePath: '/about',
    lastPath: '/about',
  },
  auth: {
    absolutePath: '/auth',
    lastPath: '/auth',
    children: {
      login: {
        absolutePath: '/auth/login',
        lastPath: '/login',
      },
      signup: {
        absolutePath: '/auth/signup',
        lastPath: '/signup',
      },
    },
  },
} as const satisfies RoutesPattern;
