import PropTypes from 'prop-types';
import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { Button } from 'COMPONENTS/common/Button';
import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';
import { TableLoaderMore } from 'COMPONENTS/Table/components';

import { DesktopTableLayer, ExchangeRow, TableTitle, TransactionRow } from './components';
import styles from './DesktopTable.scss';

export function DesktopTable({ data, isShort, isExchanges, hasMore, onRemove, selectedCurrency }) {
  const noResultText = isExchanges ? "You haven't any exchanges" : "You haven't any transactions with current currency";

  const getExchanges = () => {
    return data.map((item) => {
      const { date, exchanges } = item;

      return exchanges.map((exchange, i) => (
        <ExchangeRow
          key={exchange}
          exchange={exchange}
          date={i === 0 ? date : null}
          dayLength={exchanges.length}
          onRemove={onRemove}
        />
      ));
    });
  };

  const getTransactions = () => {
    return Object.values(data).map((item) => {
      const { date, expend = [], income = [], total } = item;

      const transactions = [...income, ...expend];

      return transactions.map((transaction, i) => (
        <TransactionRow
          key={transaction}
          transaction={transaction}
          date={i === 0 ? date : null}
          total={total[income.includes(transaction) ? 'income' : 'expend']}
          dayLength={transactions.length}
          currency={selectedCurrency}
          onRemove={onRemove}
        />
      ));
    });
  };

  return (
    <div className={styles.table}>
      <DesktopTableLayer isTitles>
        <TableTitle isExchanges={isExchanges} />
      </DesktopTableLayer>
      <DesktopTableLayer>{isExchanges ? getExchanges() : getTransactions()}</DesktopTableLayer>
      {!Object.keys(data || {}).length && !hasMore && <Text font="u20r">{noResultText}</Text>}
      {!isShort && hasMore && <TableLoaderMore />}
      {isShort && hasMore && (
        <Link to={isExchanges ? ROUTES.EXCHANGES : ROUTES.TRANSACTIONS}>
          <div className={styles.showMore}>
            <Button type="inline">Show more</Button>
          </div>
        </Link>
      )}
    </div>
  );
}

DesktopTable.propTypes = {
  isShort: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isExchanges: PropTypes.bool,
  hasMore: PropTypes.bool,
  onRemove: PropTypes.func,
  selectedCurrency: PropTypes.string,
};

DesktopTable.defaultProps = {
  isShort: false,
  data: null,
  isExchanges: false,
  hasMore: false,
  onRemove: Function.prototype,
  selectedCurrency: null,
};
