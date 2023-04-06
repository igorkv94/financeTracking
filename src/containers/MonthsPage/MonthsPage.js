import React from 'react';

import { Title } from 'COMPONENTS/Title';

import { MonthsList } from './components/MonthsList';

import styles from './MonthsPage.scss';

export default function MonthsPage() {
  return (
    <div className="page">
      <Title title="Choose month" hasHome />
      <div className={styles.inner}>
        <MonthsList />
      </div>
    </div>
  );
}
