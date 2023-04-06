import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { debounce } from 'UTILS/debounce';

import { Text } from 'COMPONENTS/common/Text';

import styles from './TextField.scss';

export function TextField({ id, defaultValue, label, onChange, isDisabled, hasError }) {
  const debounceChange = debounce(onChange, 200);

  const handleChange = (e) => {
    debounceChange(id, e.target.value);
  };

  return (
    <label
      className={cx(styles.wrapper, {
        [styles.isDisabled]: isDisabled,
        [styles.hasError]: hasError,
      })}
    >
      <input
        placeholder=" "
        className={styles.field}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={isDisabled}
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

TextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
};

TextField.defaultProps = {
  id: null,
  label: null,
  defaultValue: '',
  onChange: Function.prototype,
  isDisabled: false,
  hasError: false,
};
