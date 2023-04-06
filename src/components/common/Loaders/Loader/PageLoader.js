import React from 'react';

import styles from './PageLoader.scss';

export function PageLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}
