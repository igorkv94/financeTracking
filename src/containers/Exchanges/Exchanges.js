import React from 'react';

import { ExchangesTable } from 'COMPONENTS/ExchangesTable';
import { Title } from 'COMPONENTS/Title';

export default function Exchanges() {
  return (
    <div className="page">
      <Title title="Exchanges" hasHome />
      <ExchangesTable />
    </div>
  );
}
