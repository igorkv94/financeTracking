import React from 'react';

import styles from './CircleLoader.scss';

export function CircleLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.part}></div>
      <div className={styles.part}></div>
      <div className={styles.part}></div>
      <div className={styles.part}></div>
    </div>
  );
}
