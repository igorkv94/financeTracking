import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './DesktopTableLayer.scss';

export function DesktopTableLayer({ isTitles, children }) {
  return (
    <div className={cx(styles.gridWrapper, { [styles.gridTitle]: isTitles })}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
}

DesktopTableLayer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  isTitles: PropTypes.bool,
};

DesktopTableLayer.defaultProps = {
  isTitles: false,
};
