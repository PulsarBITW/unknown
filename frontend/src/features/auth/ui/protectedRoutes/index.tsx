import {ReactNode} from 'react';
import {Navigate} from '@tanstack/react-router';
import {useUnit} from 'effector-react';

import {ROUTES} from '@shared/config';

import {$isAuth} from '../../model/authModel';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const AuthRoute = ({children}: ProtectedRouteProps) => {
  const isAuth = useUnit($isAuth);

  if (!isAuth) {
    return <Navigate to={ROUTES.login} />;
  }

  return <>{children}</>;
};

export const UnauthRoute = ({children}: ProtectedRouteProps) => {
  const isAuth = useUnit($isAuth);

  if (isAuth) {
    return <Navigate to={ROUTES.home} />;
  }

  return <>{children}</>;
};
