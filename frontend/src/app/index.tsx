import {createRoot} from 'react-dom/client';
import {allSettled} from 'effector';

import {appScope} from '@shared/config';

import {appModel} from './model';
import {AppWithProvider} from './ui';

async function initializeApp() {
  const root = document.getElementById('root')!;

  allSettled(appModel.appStarted, {scope: appScope});

  createRoot(root).render(<AppWithProvider />);
}

export default initializeApp;
