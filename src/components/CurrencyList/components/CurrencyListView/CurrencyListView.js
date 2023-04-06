import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { CurrencyCard } from 'COMPONENTS/CurrencyCard';

import styles from './CurrencyListView.scss';

export function CurrencyListView({ name, list, hasAdd, onAdd, onChange, defaultValue }) {
  const [activeId, setActiveId] = useState(defaultValue);

  const handleSelect = (newId) => {
    if (activeId !== newId) {
      onChange(name, newId);
    }
    setActiveId(newId);
  };

  return (
    <div className={styles.wrapper}>
      {list.map(({ code, id }) => (
        <div key={id} className={styles.item}>
          <CurrencyCard id={id} name={code} isActive={activeId === id} onClick={handleSelect} />
        </div>
      ))}
      {hasAdd && <CurrencyCard onClick={onAdd} isForAdd />}
    </div>
  );
}

CurrencyListView.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  hasAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

CurrencyListView.defaultProps = {
  hasAdd: false,
  onAdd: Function.prototype,
  onChange: Function.prototype,
  defaultValue: null,
};
