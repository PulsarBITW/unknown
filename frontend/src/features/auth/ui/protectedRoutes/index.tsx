import {ReactNode} from 'react';
import {Navigate} from '@tanstack/react-router';
import {useUnit} from 'effector-react';

import {ROUTES} from '@shared/config';

import {authModel} from '../../model/authModel';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const AuthRoute = ({children}: ProtectedRouteProps) => {
  const isAuth = useUnit(authModel.$isAuth);

  if (!isAuth) {
    return <Navigate to={ROUTES.auth.children.login.absolutePath} />;
  }

  return <>{children}</>;
};

export const UnauthRoute = ({children}: ProtectedRouteProps) => {
  const isAuth = useUnit(authModel.$isAuth);

  if (isAuth) {
    return <Navigate to={ROUTES.home.absolutePath} />;
  }

  return <>{children}</>;
};
