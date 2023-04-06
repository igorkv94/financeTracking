import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'COMPONENTS/common/Button';
import { Icon } from 'COMPONENTS/common/Icon';
import { TextField } from 'COMPONENTS/common/TextField';

import { SelectedItem } from './components/SelectedItem';

import styles from './Select.scss';

import { List } from '../List';

export function Select({
  activeItems,
  selected,
  isIncome,
  onRemove,
  onFilterChange,
  handleChangeTypes,
  handleSelect,
  onEdit,
}) {
  const label = isIncome ? 'Income filter' : 'Expense filter';
  const buttonText = isIncome ? 'Expense' : 'Income';

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.textField}>
          {selected && <SelectedItem selected={selected} onRemove={onRemove} />}
          {!selected && <TextField key={label} id="type" label={label} onChange={onFilterChange} />}
        </div>
        <Button className={styles.button} onClick={handleChangeTypes}>
          {buttonText}
        </Button>
        <Button className={styles.iconButton} onClick={onEdit}>
          <Icon name="pencil" size={35} />
        </Button>
      </div>
      <List items={activeItems} handleSelect={handleSelect} isIncome={isIncome} selected={selected} />
    </div>
  );
}

Select.propTypes = {
  activeItems: PropTypes.array,
  selected: PropTypes.string,
  isIncome: PropTypes.bool,
  onSelect: PropTypes.func,
  onChangeType: PropTypes.func,
  onRemove: PropTypes.func,
  onFilterChange: PropTypes.func,
  handleChangeTypes: PropTypes.func,
  handleSelect: PropTypes.func,
  onEdit: PropTypes.func,
};

Select.defaultProps = {
  activeItems: null,
  selected: null,
  isIncome: false,
  onSelect: Function.prototype,
  onChangeType: Function.prototype,
  onRemove: Function.prototype,
  onFilterChange: Function.prototype,
  handleChangeTypes: Function.prototype,
  handleSelect: Function.prototype,
  onEdit: Function.prototype,
};
