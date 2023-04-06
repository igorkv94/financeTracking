import cx from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from 'CONSTS/routes';

import { Button } from 'COMPONENTS/common/Button/Button';
import { Icon } from 'COMPONENTS/common/Icon';
import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';
import { Nav } from 'COMPONENTS/Nav';
import { logoutAction } from 'REDUX/login';

import styles from './Header.scss';

export function Header() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => !!state.currentUser.uid);

  const logOut = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <div className={styles.emptyHeader} />
      <div className={styles.header}>
        <div className={styles.left}>
          <div className="flex">
            <Link to={ROUTES.MAIN}>
              <div className={styles.linkInner}>
                <Icon size={60} name="logo" fill="#03890f" />
                <div className={cx(styles.name, 'desktopOnlyFlex')}>
                  <Text font="s30s">Finance Tracker</Text>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          {isAuthorized && (
            <>
              <div className="desktopOnlyFlex">
                <Nav />
              </div>
              <Button type="inline" onClick={logOut} height={40}>
                Log out
              </Button>
            </>
          )}
          {!isAuthorized && (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button type="inline">Log In</Button>
              </Link>
              <div className={cx(styles.rightInner, 'desktopOnlyFlex')}>
                <Link to={ROUTES.REGISTRATION}>
                  <Button type="inline">Sign Up</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
