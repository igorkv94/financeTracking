import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import { MonthChart, MonthChartLoader, TableRow, TableRowLoader, TableTitle } from './components';
import styles from './MonthSection.scss';

Chart.register(...registerables);

export function MonthSection({ data, isLoading }) {
  const getItem = (item) => {
    const { category, amount, percent, color } = item;

    return <TableRow key={category?.name} category={category} amount={amount} percent={percent} color={color} />;
  };
  if (!isLoading && (!data.length || !data.some((item) => item.amount))) {
    return (
      <div className={styles.noData}>
        <Text font="u20r">You haven&apos;t any transactions with current currency</Text>
      </div>
    );
  }

  return (
    <div className={styles.monthWrapper}>
      {!isLoading && <MonthChart data={data} />}
      {isLoading && <MonthChartLoader />}
      <div className={styles.monthTable}>
        <TableTitle />
        {!isLoading && <div className={styles.rows}>{data.map(getItem)}</div>}
        {isLoading && <TableRowLoader />}
      </div>
    </div>
  );
}

MonthSection.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

MonthSection.defaultProps = {
  data: [],
  isLoading: false,
};
