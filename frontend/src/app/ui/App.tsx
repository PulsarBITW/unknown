import {useState} from 'react';
import {Spinner, Theme} from '@radix-ui/themes';
import {RouterProvider} from '@tanstack/react-router';
import {useUnit} from 'effector-react';

import {appModel} from '@app/model';

import {router} from './routing';

import styles from './app.module.css';
import '@radix-ui/themes/styles.css';

export function App() {
  const isInitialAuthLoading = useUnit(appModel.$isInitialAuthLoading);
  const [darkMode] = useState<boolean>(false);
  const getAppearance = () => (darkMode ? 'dark' : 'light');

  return (
    <Theme appearance={getAppearance()}>
      {isInitialAuthLoading ? (
        <div className={styles['spinner-wrapper']}>
          <Spinner className={styles['spinner']} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </Theme>
  );
}
