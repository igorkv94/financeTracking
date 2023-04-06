import cx from 'classnames';
import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { IconLink } from 'COMPONENTS/common/Icon';
import { ExchangesTable } from 'COMPONENTS/ExchangesTable';
import { Nav } from 'COMPONENTS/Nav';
import { Title } from 'COMPONENTS/Title';
import { TransactionsTable } from 'COMPONENTS/TransactionsTable';

import { Cards, TotalChart } from './components';
import styles from './Main.scss';

export default function Main() {
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.navWrapper, 'mobileOnlyFlex')}>
        <Nav />
      </div>
      <div className="page">
        <Cards />
      </div>
      <div className="page">
        <Title
          title="Total statistics"
          rightElem={<IconLink to={ROUTES.MONTHS} size={40} iconSize={30} icon="calendar" fill="var(--color-svg)" />}
        />
        <TotalChart />
      </div>
      <div className="page">
        <Title title="Exchanges" />
        <ExchangesTable isShort />
      </div>
      <div className="page">
        <Title title="Transactions" />
        <TransactionsTable isShort />
      </div>
    </div>
  );
}
