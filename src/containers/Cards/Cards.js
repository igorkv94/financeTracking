import React from 'react';

import { Text } from 'COMPONENTS/common/Text';
import { TableLoader } from 'COMPONENTS/Table/components';
import { Title } from 'COMPONENTS/Title';

import { useCurrencyStats } from './helpers/useCurrencyStats';

import { CardsForm } from './components/CardsForm';

import styles from './Cards.scss';

export default function Cards() {
  const { data, hasData, isLoadingStats, onSubmitData } = useCurrencyStats();

  return (
    <div className="page">
      <Title title="Cards" hasHome />
      <div className={styles.inner}>
        {isLoadingStats && <TableLoader />}
        {!isLoadingStats && hasData && <CardsForm data={data} onSubmitData={onSubmitData} />}
        {!isLoadingStats && !hasData && <Text font="s20r">You have to add currency first</Text>}
      </div>
    </div>
  );
}
