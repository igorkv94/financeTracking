import cx from 'classnames';
import React from 'react';

import { useCurrencyStats } from './helpers/useCurrencyStats';

import { Card } from './Card';
import styles from './Cards.scss';

export function Cards() {
  const touchDevice = 'ontouchstart' in window.document.documentElement;
  const items = ['income', 'expend', 'profit', 'current', 'exchangedIn', 'exchangedOut'];

  const { data, isLoading } = useCurrencyStats();

  return (
    <div className={cx(styles.stats, { [styles.withMobileXScroll]: touchDevice })}>
      <div className={styles.inner}>
        {items.map((key) => {
          let amount = data?.[key] || 0;
          if (key === 'profit') {
            amount = data?.income - data?.expend;
          }

          return <Card key={key} viewType={key} amount={amount} isLoading={isLoading} />;
        })}
      </div>
    </div>
  );
}
