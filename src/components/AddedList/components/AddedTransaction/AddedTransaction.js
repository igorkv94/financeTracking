import PropTypes from 'prop-types';
import React from 'react';

import { dateFormat } from 'UTILS/dateFormat';

import { Icon } from 'COMPONENTS/common/Icon';
import { IconWithText } from 'COMPONENTS/common/IconWithText';
import { Text } from 'COMPONENTS/common/Text';

import styles from '../../AddedList.scss';

export function AddedTransaction({ category, amount, date, currency }) {
  const categoriesObj = JSON.parse(localStorage.getItem('categories'));

  return (
    <div key={date} className={styles.row}>
      <div className={styles.date}>
        <Text font="p18r">
          {dateFormat({
            timestamp: date,
            format: '$4:$5',
          })}
        </Text>
      </div>
      <div className={styles.category}>
        <IconWithText categoryIcon={categoriesObj[category].icon}>{categoriesObj[category].name}</IconWithText>
      </div>
      <div className={styles.amount}>
        <Text font="p18r">{amount}</Text>
        <Icon name={currency} size={24} iconSize={24} fill="var(--color-svg)" />
      </div>
    </div>
  );
}

AddedTransaction.propTypes = {
  category: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.number,
  currency: PropTypes.string,
};

AddedTransaction.defaultProps = {
  category: null,
  amount: null,
  date: null,
  currency: null,
};
