import {Text} from '@radix-ui/themes';
import {useUnit} from 'effector-react';

import {signupPageModel} from '../model';

import styles from './signup.module.css';

export const ServerErrorMessage = () => {
  const error = useUnit(signupPageModel.$error);

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
