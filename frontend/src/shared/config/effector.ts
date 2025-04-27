import {NavigateOptions, ParsedLocation, UseNavigateResult} from '@tanstack/react-router';
import {attach, fork} from 'effector';
import {createGate} from 'effector-react';
import {debug} from 'patronum';

export const appScope = fork();

export type NavigateConnectorGateProps = {
  navigate: UseNavigateResult<string>;
  location: ParsedLocation;
};

export const NavigateConnectorGate = createGate<NavigateConnectorGateProps>();

export const redirectFx = attach({
  source: NavigateConnectorGate.state,
  effect: (navigateConnectorState, navigateOptions: NavigateOptions) => {
    navigateConnectorState?.navigate(navigateOptions);
  },
});

debug.registerScope(appScope, {name: 'appScope'});
