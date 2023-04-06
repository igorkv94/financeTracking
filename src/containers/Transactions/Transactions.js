import React from 'react';

import { Title } from 'COMPONENTS/Title';
import { TransactionsTable } from 'COMPONENTS/TransactionsTable';

export default function Transactions() {
  return (
    <div className="page">
      <Title title="Transactions" hasHome />
      <TransactionsTable />
    </div>
  );
}
