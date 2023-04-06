import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Icon.scss';

export function Icon({ className, onClick, name, fill, size, iconSize, stroke, disabled, hasHover }) {
  let [icon, setIcon] = useState('');
  const cancelled = useRef(false);

  const getSvg = async () => {
    let importedIcon = await import(`ASSETS/icons/${name}.svg`);
    if (!cancelled.current) {
      setIcon('');
      setIcon(importedIcon.default);
    }
  };

  useEffect(() => {
    cancelled.current = false;
    getSvg();
    return () => {
      cancelled.current = true;
    };
  }, [name]);

  const handleClick = (e) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cx(styles.wrapper, className, {
        [styles.hasHover]: (hasHover || !!onClick) && !disabled,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
    >
      <div
        style={{
          display: 'flex',
          stroke: stroke,
          fill: fill,
          width: `${iconSize || size}px`,
          height: `${iconSize || size}px`,
        }}
      >
        <div className={styles.icon}>{icon}</div>
      </div>
    </div>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.number,
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  hasHover: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  onClick: null,
  fill: null,
  stroke: null,
  size: 40,
  iconSize: null,
  disabled: false,
  hasHover: false,
};
