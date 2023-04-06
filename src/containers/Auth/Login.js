import React from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from 'CONSTS/routes';

import { Button } from 'COMPONENTS/common/Button/Button';
import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';
import { loginAction } from 'REDUX/login';

import { AuthForm } from './components/AuthForm/AuthForm';

import styles from './Auth.scss';

export default function Login() {
  const dispatch = useDispatch();

  const onSubmit = ({ password, email }) => {
    dispatch(loginAction({ password, email }));
  };

  return (
    <>
      <AuthForm isLogin onSubmit={onSubmit} />
      <div className={styles.bottom}>
        <Text font="p16r">Don&apos;t have an account?</Text>
        <Link to={ROUTES.REGISTRATION}>
          <Button font="p18s" type="inline">
            Sign up
          </Button>
        </Link>
      </div>
    </>
  );
}
