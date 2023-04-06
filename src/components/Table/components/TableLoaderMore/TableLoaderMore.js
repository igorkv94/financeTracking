import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TableLoaderMore.scss';

export function TableLoaderMore({ isMobile }) {
  return (
    <div className={cx(styles.wrapper, { [styles.isMobile]: isMobile })}>
      <div className={styles.inner}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  );
}

TableLoaderMore.propTypes = {
  isMobile: PropTypes.bool,
};

TableLoaderMore.defaultProps = {
  isMobile: false,
};
