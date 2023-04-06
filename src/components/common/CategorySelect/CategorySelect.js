import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'CONSTS/routes';

import { useCategories } from './helpers/useCategories';

import { Select } from './components/Select';

export function CategorySelect({ onChange, isIncome, onEdit }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const { activeItems, setFilterValue } = useCategories({ isIncome });

  const handleChangeTypes = () => {
    const newValue = !isIncome;
    navigate(isIncome ? ROUTES.ADD_EXPEND : ROUTES.ADD_INCOME);
    setSelected(null);
    onChange('isIncome', newValue);
    onChange('category', null);
  };

  const onRemove = () => {
    setSelected(null);
    onChange('category', null);
    setFilterValue('');
  };

  const onFilterChange = (_, value) => {
    setFilterValue(value);
  };

  const handleSelect = (id, name) => {
    setSelected(name);
    onChange('category', id);
  };

  return (
    <Select
      activeItems={activeItems}
      selected={selected}
      isIncome={isIncome}
      onRemove={onRemove}
      onFilterChange={onFilterChange}
      handleChangeTypes={handleChangeTypes}
      handleSelect={handleSelect}
      onEdit={onEdit}
    />
  );
}

CategorySelect.propTypes = { onChange: PropTypes.func, isIncome: PropTypes.bool, onEdit: PropTypes.func };

CategorySelect.defaultProps = { onChange: Function.prototype, isIncome: false, onEdit: Function.prototype };
