import PropTypes from 'prop-types';
import React from 'react';

import { dateFormat } from 'UTILS/dateFormat';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from '../../AddedList.scss';

export function AddedExchange({ date, fromCurrency, fromValue, toCurrency, toValue }) {
  return (
    <div key={date} className={styles.row}>
      <div className={styles.date}>
        <Text font="p18r">
          {dateFormat({
            timestamp: date,
            options: { day: undefined, month: undefined, year: undefined, hour: '2-digit', minute: '2-digit' },
          })}
        </Text>
      </div>
      <Text font="p18r">
        {fromValue} {fromCurrency}
      </Text>
      <div className={styles.rightArrowWrapper}>
        <Icon name="rightArrow" size={25} />
      </div>
      <Text font="p18r">
        {toValue} {toCurrency}
      </Text>
    </div>
  );
}

AddedExchange.propTypes = {
  date: PropTypes.number,
  fromCurrency: PropTypes.string,
  fromValue: PropTypes.number,
  toCurrency: PropTypes.string,
  toValue: PropTypes.number,
};

AddedExchange.defaultProps = {
  date: null,
  fromCurrency: null,
  fromValue: null,
  toCurrency: null,
  toValue: null,
};
