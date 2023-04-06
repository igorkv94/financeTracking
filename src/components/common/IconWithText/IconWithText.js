import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './IconWithText.scss';

export function IconWithText({ icon, color, categoryIcon, children }) {
  return (
    <div className={styles.iconWithText}>
      <div className={styles.iconNearText}>
        {categoryIcon && (
          <Text font="p18r" color={color}>
            {categoryIcon}
          </Text>
        )}
        {icon && <Icon fill={color} size={30} name={icon} />}
      </div>
      {children && (
        <div className={styles.textWrapper}>
          <Text font="p18r" color={color}>
            {children}
          </Text>
        </div>
      )}
    </div>
  );
}

IconWithText.propTypes = {
  icon: PropTypes.string,
  categoryIcon: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
};

IconWithText.defaultProps = {
  icon: null,
  color: 'black',
  categoryIcon: null,
};
