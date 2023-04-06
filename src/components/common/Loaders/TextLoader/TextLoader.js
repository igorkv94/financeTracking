import React from 'react';

import styles from './TextLoader.scss';

export function TextLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}
