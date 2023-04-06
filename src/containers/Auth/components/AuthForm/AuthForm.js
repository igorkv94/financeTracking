import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'COMPONENTS/common/Button';
import { ErrorsView } from 'COMPONENTS/common/ErrorsView/ErrorsView';
import { Text } from 'COMPONENTS/common/Text';
import { TextField } from 'COMPONENTS/common/TextField';

import { useAuthForm } from './helpers/useAuthForm';

import styles from './AuthForm.scss';

export function AuthForm({ isLogin, onSubmit }) {
  const title = isLogin ? 'Login' : 'Registration';
  const buttonText = isLogin ? 'Log in' : 'Sign up';
  const { onChange, handleSubmit, errors } = useAuthForm({ isLogin, onSubmit });

  return (
    <div className={styles.wrapper}>
      <form className={styles.inner}>
        <div className={styles.title}>
          <Text font="s50s">{title}</Text>
        </div>
        <div className={styles.margin40}>
          <TextField id="email" label="Email" onChange={onChange} />
        </div>
        <div className={styles.margin20}>
          <TextField id="password" label="Password" onChange={onChange} />
        </div>
        {!isLogin && (
          <div className={styles.margin20}>
            <TextField id="confirmPassword" label="Confirm password" onChange={onChange} />
          </div>
        )}
        <ErrorsView errors={errors} />
        <Button className={styles.button} onClick={handleSubmit}>
          {buttonText}
        </Button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
  onSubmit: PropTypes.func,
};

AuthForm.defaultProps = {
  isLogin: false,
  onSubmit: Function.prototype,
};
