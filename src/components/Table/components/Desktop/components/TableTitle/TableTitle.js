import PropTypes from 'prop-types';
import React from 'react';

import { exchangesTitles, transactionsTitles } from 'CONSTS/tableTitles';

import { Text } from 'COMPONENTS/common/Text';

import { DesktopTableRowLayer } from '../DesktopTableRowLayer';

export function TableTitle({ isExchanges }) {
  const font = 's18r';
  const titles = isExchanges ? exchangesTitles : transactionsTitles;

  return (
    <DesktopTableRowLayer
      isTitles
      isExchanges={isExchanges}
      columnsData={Array.from({ length: 4 }).map((_, key) => (
        <Text key={key} font={font}>
          {titles[key]}
        </Text>
      ))}
    />
  );
}

TableTitle.propTypes = {
  isExchanges: PropTypes.bool,
};

TableTitle.defaultProps = {
  isExchanges: false,
};
