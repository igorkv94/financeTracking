import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { getYearAndMonth } from 'UTILS/dateFormat';

import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';

import styles from './MonthCard.scss';

export function MonthCard({ year, index, month, isDisabled }) {
  const link = ROUTES.STATS.replace(':month', getYearAndMonth(year, index));

  return (
    <Link className={styles.month} to={link}>
      <div className={cx(styles.monthInner, { [styles.disabled]: isDisabled })}>
        <div className="desktopOnly">
          <Text font="s18s">{month}</Text>
        </div>
        <div className="mobileOnly">
          <Text font="s18s">{month.substring(0, 3)}</Text>
        </div>
      </div>
    </Link>
  );
}

MonthCard.propTypes = {
  year: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
