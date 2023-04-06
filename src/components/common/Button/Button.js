import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import styles from './Button.scss';

export function Button({
  className,
  children,
  type,
  size,
  height,
  onClick,
  isFullWidth,
  isActive,
  isDisabled,
  font,
  color,
}) {
  const handleClick = (e) => {
    if (!isDisabled) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      style={{ width: `${size}px`, height: `${size || height}px` }}
      className={cx(
        styles.button,
        styles[type],
        { [styles.isActive]: isActive, [styles.isDisabled]: isDisabled, [styles.fullWidth]: isFullWidth },
        className,
      )}
    >
      <Text font={font} children={children} color={color} />
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  font: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['border', 'inline', 'icon']),
  size: PropTypes.number,
  height: PropTypes.number,
  isFullWidth: PropTypes.bool,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  font: 'p20s',
  color: undefined,
  onClick: Function.prototype,
  type: 'border',
  size: null,
  height: null,
  isFullWidth: false,
  isActive: false,
  isDisabled: false,
};
