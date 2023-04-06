import React from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from 'CONSTS/routes';

import { Button } from 'COMPONENTS/common/Button/Button';
import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';
import { signUpAction } from 'REDUX/registration';

import { AuthForm } from './components/AuthForm/AuthForm';

import styles from './Auth.scss';

export default function Login() {
  const dispatch = useDispatch();

  const onSubmit = ({ password, email }) => {
    dispatch(signUpAction({ password, email }));
  };

  return (
    <>
      <AuthForm onSubmit={onSubmit} />
      <div className={styles.bottom}>
        <Text font="p16r">Have an account?</Text>
        <Link to={ROUTES.LOGIN}>
          <Button font="p18s" type="inline">
            Log in
          </Button>
        </Link>
      </div>
    </>
  );
}
