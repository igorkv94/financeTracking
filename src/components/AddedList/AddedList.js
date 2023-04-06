import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import styles from './AddedList.scss';
import { AddedExchange, AddedTransaction } from './components';

export function AddedList({ data, isExchanges }) {
  const noDataText = isExchanges ? 'No exchanges added' : 'No transactions added';

  const getExchange = ({ date, fromCurrency, fromValue, toCurrency, toValue }) => {
    return (
      <AddedExchange
        key={date}
        date={date}
        fromCurrency={fromCurrency}
        fromValue={fromValue}
        toCurrency={toCurrency}
        toValue={toValue}
      />
    );
  };

  const getTransaction = ({ category, amount, date, currency }) => {
    return <AddedTransaction key={date} category={category} amount={amount} date={date} currency={currency} />;
  };

  return (
    <div>
      <div className={styles.title}>
        <Text font="s20s">Added:</Text>
      </div>
      <div>
        {!data.length && <Text font="p18r">{noDataText}</Text>}
        {data.map(isExchanges ? getExchange : getTransaction)}
      </div>
    </div>
  );
}

AddedList.propTypes = {
  isExchanges: PropTypes.bool,
  data: PropTypes.array.isRequired,
};

AddedList.defaultProps = {
  isExchanges: false,
};
