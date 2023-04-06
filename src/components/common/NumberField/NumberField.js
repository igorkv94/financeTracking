import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import styles from './NumberField.scss';

export function NumberField({ id, value, label, onChange, isDisabled, hasError, withDecimal, withNegative }) {
  console.log(`value : `, value);
  const handleChange = (e) => {
    const value = e.target.value.trim();
    const hasMinus = withNegative && value[0] === '-';
    let valueNumber = hasMinus ? value.substring(1) : value;

    if ((!withDecimal && value.includes('.')) || (!withNegative && value.includes('-'))) {
      return;
    }

    if (!valueNumber.length) {
      onChange(id, hasMinus ? '-' : '');
      return;
    }

    if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(valueNumber)) {
      onChange(id, value);
    }
  };

  return (
    <label
      className={cx(styles.wrapper, {
        [styles.isDisabled]: isDisabled,
        [styles.hasError]: hasError,
      })}
    >
      <input
        className={styles.field}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        inputMode="numeric"
        placeholder=" "
      />
      <div className={styles.fieldName}>
        <Text font="s13r">{label}</Text>
        <div className={styles.fieldNameAnim}>
          <Text font="s20r">{label}</Text>
        </div>
      </div>
    </label>
  );
}

NumberField.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  withDecimal: PropTypes.bool,
  withNegative: PropTypes.bool,
};

NumberField.defaultProps = {
  id: null,
  label: null,
  value: '',
  onChange: Function.prototype,
  isDisabled: false,
  hasError: false,
  withDecimal: false,
  withNegative: false,
};
