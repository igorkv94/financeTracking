import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { dateFormat } from 'UTILS/dateFormat';
import { getPercent } from 'UTILS/getPercent';

import { Icon } from 'COMPONENTS/common/Icon';
import { IconWithText } from 'COMPONENTS/common/IconWithText';
import { Text } from 'COMPONENTS/common/Text';

import styles from './TransactionRow.scss';

import { DesktopTableRowLayer } from '../DesktopTableRowLayer';

export function TransactionRow({ transaction, date, currency, dayLength, onRemove, total }) {
  const storageTransactions = JSON.parse(localStorage.getItem('transactions'));
  const { id, category, amount } = storageTransactions[transaction];

  const color = category.isIncome ? '#39a362' : '#c70808';

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <DesktopTableRowLayer
      gridRow={`span ${dayLength}`}
      columnsData={[
        date && (
          <div key={date} className={styles.sticky}>
            <Text font="p18r">{dateFormat({ timestamp: date })}</Text>
          </div>
        ),
        <Fragment key={1}>
          <div className={styles.categoryWrapper}>
            <IconWithText categoryIcon={category.icon}>{category.name}</IconWithText>
          </div>
          <Icon name={currency} size={25} iconSize={25} fill="var(--color-svg)" />
        </Fragment>,
        <IconWithText key={3} icon={category.isIncome ? 'topArrow' : 'bottomArrow'} color={color}>
          {amount}
        </IconWithText>,
        <Text key={3} font="p18r" color={color}>
          {getPercent(amount, total)}%
        </Text>,
        <Icon
          key={4}
          className={styles.icon}
          name="trashBin"
          size={30}
          fill="var(--color-svg)"
          onClick={handleRemove}
        />,
      ]}
    />
  );
}

TransactionRow.propTypes = {
  date: PropTypes.number,
  transaction: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  dayLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
};

TransactionRow.defaultProps = {
  date: null,
  onRemove: Function.prototype,
};
