import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './SelectedItem.scss';

export function SelectedItem({ selected, onRemove }) {
  return (
    <div className={styles.wrapper}>
      <Text font="s20s">{selected}</Text>
      <Icon name="remove" size={30} iconSize={25} onClick={onRemove} />
    </div>
  );
}

SelectedItem.propTypes = {
  selected: PropTypes.string,
  onRemove: PropTypes.func,
};

SelectedItem.defaultProps = {
  selected: null,
  onRemove: Function.prototype,
};
