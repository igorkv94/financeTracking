import PropTypes from 'prop-types';
import React from 'react';

import { dateFormat } from 'UTILS/dateFormat';
import { getPercent } from 'UTILS/getPercent';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './TransactionRow.scss';

export function TransactionRow({ transaction, date, currency, onRemove, total }) {
  const storageTransactions = JSON.parse(localStorage.getItem('transactions'));

  const { id, category, amount } = storageTransactions[transaction];

  const color = category.isIncome ? '#39a362' : '#c70808';

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <>
      {date && (
        <div className={styles.date}>
          <Text font="s18r">{dateFormat({ timestamp: date })}</Text>
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.iconWrapper}>{category.icon}</div>
        <div className={styles.left}>
          <div className={styles.row}>
            <Text font="s18s" inRow>
              {category.name}
            </Text>
          </div>
          <div className={styles.row}>
            <Text font="p18r" color={color}>
              {amount}
            </Text>
            <Icon name={currency} size={24} iconSize={24} fill="var(--color-svg)" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.procent}>
            <Text font="p18s" color={color}>
              {getPercent(amount, total)}%
            </Text>
          </div>
          <div className={styles.removeIcon}>
            <Icon name="trashBin" size={30} fill="var(--color-svg)" onClick={handleRemove} />
          </div>
        </div>
      </div>
    </>
  );
}

TransactionRow.propTypes = {
  transaction: PropTypes.string.isRequired,
  date: PropTypes.number,
  currency: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
};

TransactionRow.defaultProps = {
  onRemove: Function.prototype,
  date: null,
};
