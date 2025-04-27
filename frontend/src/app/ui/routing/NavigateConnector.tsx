import {useLocation, useNavigate} from '@tanstack/react-router';
import {useGate} from 'effector-react';

import {NavigateConnectorGate} from '@shared/config';

export const NavigateConnector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useGate(NavigateConnectorGate, {navigate, location});

  return null;
};
