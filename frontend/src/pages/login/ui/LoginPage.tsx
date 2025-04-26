import {LoginForm} from './LoginForm';

import styles from './login.module.css';

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
