import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { IconLink } from 'COMPONENTS/common/Icon';
import { Currency } from 'COMPONENTS/Header/components/Currency';

import styles from './Nav.scss';

export function Nav() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <Currency />
      </div>
      <div className={styles.iconWrapper}>
        <IconLink icon="card" to={ROUTES.CARDS} size={40} iconSize={30} fill="var(--color-svg)" />
      </div>
      <div className={styles.iconWrapper}>
        <IconLink icon="exchange" to={ROUTES.EXCHANGE} size={40} iconSize={30} fill="var(--color-svg)" />
      </div>
      <div className={styles.iconWrapper}>
        <IconLink icon="add" to={ROUTES.ADD_EXPEND} size={40} iconSize={35} fill="var(--color-svg)" />
      </div>
    </div>
  );
}
