import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Text } from 'COMPONENTS/common/Text';
import { MonthCard } from 'CONTAINERS/MonthsPage/components/MonthsList/components/MonthCard';

import { getDates, months } from './helpers/getDates';

import styles from './MonthsList.scss';

export function MonthsList() {
  const creationTime = useSelector((state) => state.currentUser.creationTime);

  return (
    <div className={styles.wrapper}>
      {getDates(creationTime).map(({ year, activeMonths }) => (
        <Fragment key={year}>
          <div className={styles.title}>
            <Text font="s24s">{year}</Text>
          </div>
          <div className={styles.list}>
            {months.map((month, index) => (
              <MonthCard
                key={month}
                year={year}
                index={index}
                month={month}
                activeMonths={activeMonths}
                isDisabled={index < activeMonths[0] || index > activeMonths[1]}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
