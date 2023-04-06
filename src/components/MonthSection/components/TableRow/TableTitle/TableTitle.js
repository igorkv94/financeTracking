import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import { TableRowLayer } from '../TableRowLayer';

export function TableTitle() {
  const font = 's18r';
  return (
    <TableRowLayer
      isTitle
      columsData={[
        undefined,
        <Text key={1} font={font}>
          Category
        </Text>,
        <Text key={2} font={font}>
          Amount
        </Text>,
        <Text key={3} font={font}>
          Percent(~)
        </Text>,
      ]}
    />
  );
}
