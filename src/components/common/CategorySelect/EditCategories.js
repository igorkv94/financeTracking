import PropTypes from 'prop-types';
import React from 'react';

import { createUUID } from 'UTILS/uuid';

import { getNext } from './helpers/getNext';

import { EditCategoriesView } from './components/EditCategoriesView';

export function EditCategories({ activeItems, setActiveItems, onEdit, isIncome }) {
  const onAdd = (newItem) => {
    setActiveItems([{ ...newItem, isVisible: true, isIncome, isNew: true, id: createUUID() }, ...activeItems]);
  };

  const onMove = (id, isUp) => {
    const index = activeItems.findIndex((item) => item.id === id);
    let data = [...activeItems.slice(0, index), ...activeItems.slice(index + 1)];

    let newIndex = getNext(index, activeItems.length, isUp);
    setActiveItems([...data.slice(0, newIndex), activeItems[index], ...data.slice(newIndex)]);
  };

  const onHide = (id) => {
    const index = activeItems.findIndex((item) => item.id === id);

    setActiveItems([
      ...activeItems.slice(0, index),
      { ...activeItems[index], isVisible: !activeItems[index].isVisible },
      ...activeItems.slice(index + 1),
    ]);
  };

  const onRemove = (id) => {
    setActiveItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <EditCategoriesView
      activeItems={activeItems}
      onAdd={onAdd}
      onMove={onMove}
      onHide={onHide}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

EditCategories.propTypes = {
  activeItems: PropTypes.array,
  setActiveItems: PropTypes.func,
  onEdit: PropTypes.func,
  isIncome: PropTypes.bool,
};

EditCategories.defaultProps = {
  activeItems: null,
  setActiveItems: Function.prototype,
  onEdit: Function.prototype,
  isIncome: false,
};
