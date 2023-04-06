import PropTypes from 'prop-types';
import React from 'react';

import { dateFormat } from 'UTILS/dateFormat';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './ExchangeRow.scss';

export function ExchangeRow({ exchange, date, onRemove }) {
  const exchangesInfo = JSON.parse(localStorage.getItem('exchanges'));

  const { id, from, to } = exchangesInfo[exchange];

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <>
      <div className={styles.date}>{dateFormat({ timestamp: date })}</div>
      <div className={styles.info}>
        <div className={styles.exchangeInfo}>
          <div className={styles.amountWrapper}>
            <Text font="s24s">{`${from.currency.symbol} ${from.amount}`}</Text>
          </div>
          <div className={styles.rightArrowWrapper}>
            <Icon name="rightArrow" size={25} />
          </div>
          <div className={styles.amountWrapper}>
            <Text font="s24s">{`${to.currency.symbol} ${to.amount}`}</Text>
          </div>
        </div>
        <div className={styles.right}>
          <Icon name="trashBin" size={30} fill="var(--color-svg)" onClick={handleRemove} />
        </div>
      </div>
    </>
  );
}

ExchangeRow.propTypes = {
  exchange: PropTypes.string.isRequired,
  date: PropTypes.number,
  onRemove: PropTypes.func,
};

ExchangeRow.defaultProps = {
  onRemove: Function.prototype,
  date: null,
};
