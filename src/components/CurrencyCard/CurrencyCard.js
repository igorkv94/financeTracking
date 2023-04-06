import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './Currency.scss';

export function CurrencyCard({ id, name, isActive, onClick, isForAdd }) {
  const hasClickFunc = !!onClick;

  const handleClick = () => {
    if (hasClickFunc) {
      onClick(id);
    }
  };

  return (
    <div
      className={cx(styles.card, { [styles.isActive]: isActive, [styles.hasHover]: hasClickFunc })}
      onClick={handleClick}
    >
      <div className={styles.border} />
      <div className={styles.lineWrapper}>
        <div className={styles.line} />
      </div>
      <div className={styles.info}>
        {isForAdd && <Icon name="plus" size={40} fill="var(--main-bg-color)" />}
        {!isForAdd && (
          <Text font="p30r" color="var(--main-bg-color)">
            {name}
          </Text>
        )}
      </div>
      <div className={styles.numbers}>
        <div className={styles.number} />
        <div className={styles.number} />
        <div className={styles.number} />
        <div className={styles.number} />
      </div>
    </div>
  );
}

CurrencyCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isForAdd: PropTypes.bool,
};

CurrencyCard.defaultType = { id: null, name: null, onClick: null, isActive: false, isForAdd: false };
