import PropTypes from 'prop-types';
import React from 'react';

import { Table } from 'COMPONENTS/Table';

import { useTransactions } from './helpers/useTransactions';

export function TransactionsTable({ isShort }) {
  const { data, hasMore, onRemove, selectedCurrency } = useTransactions({ isShort });

  return (
    <Table
      isShort={isShort}
      data={data}
      isLoading={!data}
      hasMore={hasMore}
      onRemove={onRemove}
      selectedCurrency={selectedCurrency}
    />
  );
}

TransactionsTable.propTypes = {
  isShort: PropTypes.bool,
};

TransactionsTable.defaultProps = {
  isShort: false,
};
