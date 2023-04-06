import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';
import { TextLoader } from 'COMPONENTS/common/Loaders/TextLoader';
import { Text } from 'COMPONENTS/common/Text';

import { viewTypes } from './helpers/cardViewTypes';

import styles from './Cards.scss';

export function Card({ viewType, amount, isLoading }) {
  const { title, textColor, icon, iconColor } = viewTypes[viewType];
  const color = textColor || amount < 0 ? 'var(--color-red)' : 'var(--color-green)';

  return (
    <div className={cx(styles.stat, styles.green)}>
      <div className={styles.left}>
        <div className={styles.title}>
          <Text font="p24s" smallDesktopFont="p20s">
            {title}
          </Text>
        </div>
        <div className={styles.amount}>
          {isLoading && (
            <div className={styles.loaderWrapper}>
              <TextLoader />
            </div>
          )}
          <div className={cx({ [styles.hidden]: isLoading })}>
            <Text font="p50s" color={color} smallDesktopFont="p40s">
              {amount || 0}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.icon}>
          <Icon name={icon} fill={iconColor} size={20} />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  viewType: PropTypes.oneOf(['income', 'expend', 'profit', 'current', 'exchangedOut', 'exchangedIn']),
  amount: PropTypes.number,
  isLoading: PropTypes.bool,
};

Card.defaultProps = {
  viewType: 'income',
  amount: 0,
  isLoading: false,
};
