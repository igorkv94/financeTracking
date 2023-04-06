import React from 'react';

import styles from './RowLoader.scss';

export function RowLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  );
}
