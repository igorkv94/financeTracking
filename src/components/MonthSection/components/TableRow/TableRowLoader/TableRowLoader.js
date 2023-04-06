import React from 'react';

import { RowLoader } from 'COMPONENTS/common/Loaders/RowLoader';

import { TableRowLayer } from '../TableRowLayer';

export function TableRowLoader() {
  return (
    <TableRowLayer
      columsData={Array.from({ length: 4 }).map((_, key) => (
        <RowLoader key={key} />
      ))}
    />
  );
}
