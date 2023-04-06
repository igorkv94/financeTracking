import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import { useSpecNumberField } from './helpers/useSpecNumberField';

import styles from './SpecNumberField.scss';

export function SpecNumberField({ onChange }) {
  const { handleChip, activeChip, handleStep, textValue, handleChange, rangeValue, handleRange, maxValue, slideStep } =
    useSpecNumberField({ onChange });

  return (
    <>
      <div className={styles.chips}>
        {[50, 100, 200, 400, 600, 1000, 2000, 10000].map((item) => (
          <div
            key={item}
            onClick={handleChip(item)}
            className={cx(styles.chip, { [styles.active]: item === activeChip })}
          >
            <Text font="p16r">{item}</Text>
          </div>
        ))}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.iconWrapper}>
            <Icon name="minus" size={30} iconSize={25} onClick={handleStep()} />
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.textInput}
              value={textValue}
              onChange={handleChange}
              placeholder={0}
              inputMode="numeric"
            />
          </div>
          <div className={styles.iconWrapper}>
            <Icon name="plus" size={30} iconSize={25} onClick={handleStep(true)} />
          </div>
        </div>
        <div className={styles.bottom}>
          <input
            className={styles.rangeInput}
            type="range"
            value={rangeValue || 0}
            onChange={handleRange}
            min={0}
            max={maxValue}
            step={slideStep}
          />
        </div>
      </div>
    </>
  );
}

SpecNumberField.propTypes = {
  onChange: PropTypes.func,
};

SpecNumberField.defaultProps = {
  onChange: Function.prototype,
};
