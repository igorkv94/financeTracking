import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { SizeContext } from 'UTILS/contexts';

import { MobileTable, TableLoader, DesktopTable } from './components';

export function Table({ data, isShort, isExchanges, isLoading, hasMore, onRemove, selectedCurrency }) {
  const { size } = useContext(SizeContext);
  const isMobile = ['tablet', 'mobile'].includes(size);

  if (isLoading) {
    return <TableLoader isExchanges={isExchanges} isShort={isShort} />;
  }

  const Component = isMobile ? MobileTable : DesktopTable;

  return (
    <Component
      data={data}
      isShort={isShort}
      isExchanges={isExchanges}
      hasMore={hasMore}
      onRemove={onRemove}
      selectedCurrency={selectedCurrency}
    />
  );
}

Table.propTypes = {
  isShort: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isExchanges: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasMore: PropTypes.bool,
  onRemove: PropTypes.func,
  selectedCurrency: PropTypes.string,
};

Table.defaultProps = {
  isShort: false,
  data: null,
  isExchanges: false,
  isLoading: false,
  hasMore: false,
  onRemove: Function.prototype,
  selectedCurrency: null,
};
