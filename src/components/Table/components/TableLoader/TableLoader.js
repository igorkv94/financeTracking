import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';

import styles from './TableLoader.scss';

export function TableLoader({ isExchanges, isShort }) {
  return (
    <div className={cx(styles.wrapper, { [styles.small]: isShort })}>
      <div className={styles.inner}>
        <div
          className={cx(styles.circle, { [styles.rotateExchange]: isExchanges, [styles.rotateDollar]: !isExchanges })}
        >
          <Icon name={isExchanges ? 'exchange' : 'dollar'} fill="var(--color-green)" size={isExchanges ? 30 : 35} />
        </div>
      </div>
    </div>
  );
}

TableLoader.propTypes = {
  isShort: PropTypes.bool,
  isExchanges: PropTypes.bool,
};

TableLoader.defaultProps = {
  isShort: false,
  isExchanges: false,
};
