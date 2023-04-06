import PropTypes from 'prop-types';
import React from 'react';

import { Table } from 'COMPONENTS/Table';

import { useExchanges } from './helpers/useExchanges';

export function ExchangesTable({ isShort }) {
  const { data, hasMore, onRemove } = useExchanges({ isShort });

  return <Table isShort={isShort} data={data} isExchanges isLoading={!data} hasMore={hasMore} onRemove={onRemove} />;
}

ExchangesTable.propTypes = {
  isShort: PropTypes.bool,
};

ExchangesTable.defaultProps = {
  isShort: false,
};
