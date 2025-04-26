import {Text} from '@radix-ui/themes';
import {useUnit} from 'effector-react';

import {loginPageModel} from '../model';

import styles from './login.module.css';

export const ServerErrorMessage = () => {
  const error = useUnit(loginPageModel.$error);

  return (
    <Text
      as="div"
      size="1"
      color="red"
      className={styles['server-error-message']}
      data-visible={!!error}
    >
      {error}
    </Text>
  );
};
