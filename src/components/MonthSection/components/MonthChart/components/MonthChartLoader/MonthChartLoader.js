import React from 'react';

import { CircleLoader } from 'COMPONENTS/common/Loaders/CircleLoader';

import styles from './MonthChartLoader.scss';

import parentStyles from '../../MonthChart.scss';

export function MonthChartLoader() {
  return (
    <div className={parentStyles.chartWrapper}>
      <div className={styles.loaderWrapper}>
        <div className={styles.loaderInner}>
          <CircleLoader />
        </div>
      </div>
    </div>
  );
}
