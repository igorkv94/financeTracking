import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { dateFormat } from 'UTILS/dateFormat';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './ExchangeRow.scss';

import { DesktopTableRowLayer } from '../DesktopTableRowLayer';

export function ExchangeRow({ exchange, date, dayLength, onRemove }) {
  const exchangesInfo = JSON.parse(localStorage.getItem('exchanges'));

  const { id, from, to, rate } = exchangesInfo[exchange];

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <DesktopTableRowLayer
      isExchanges
      gridRow={`span ${dayLength}`}
      columnsData={[
        date && (
          <div key={date} className={styles.sticky}>
            <Text font="p18r">{dateFormat({ timestamp: date })}</Text>
          </div>
        ),
        <Text key={1} font="p18r">{`${from.amount} ${from.currency.code}`}</Text>,
        <Text key={2} font="p18r">{`${to.amount} ${to.currency.code}`}</Text>,
        <Text key={3} font="p18r">
          {rate}
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

ExchangeRow.propTypes = {
  date: PropTypes.number,
  exchange: PropTypes.string.isRequired,
  dayLength: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
};

ExchangeRow.defaultProps = {
  date: null,
  onRemove: Function.prototype,
};
