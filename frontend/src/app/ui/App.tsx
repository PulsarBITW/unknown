import {useState} from 'react';
import {Theme} from '@radix-ui/themes';
import {RouterProvider} from '@tanstack/react-router';

import {router} from './routing';

import '@radix-ui/themes/styles.css';

export function App() {
  const [darkMode] = useState<boolean>(false);
  const getAppearance = () => (darkMode ? 'dark' : 'light');

  return (
    <Theme appearance={getAppearance()}>
      <div style={{height: '2000px'}}>
        <RouterProvider router={router} />
      </div>
    </Theme>
  );
}
