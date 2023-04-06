import PropTypes from 'prop-types';
import React from 'react';

import { Scrollbar } from 'COMPONENTS/common/Scrollbar';

import { ListItem, NoResult } from './components/ListItem';

import styles from './List.scss';

export function List({ items, handleSelect, onMove, onHide, isEdit, selected, onRemove }) {
  return (
    <div className={styles.list}>
      {!!items?.length && (
        <Scrollbar updatedLength={items.length}>
          <div className="flexColumn">
            {items.map(({ id, name, icon, isVisible, isNew }, index) => (
              <ListItem
                key={id}
                id={id}
                hasMoveTop={index > 0}
                hasMoveDown={index < items.length - 1}
                name={name}
                icon={icon}
                onHide={onHide}
                onRemove={onRemove}
                onMove={onMove}
                handleSelect={handleSelect}
                isEdit={isEdit}
                isSelected={selected === name}
                isVisible={isVisible}
                isNew={isNew}
              />
            ))}
          </div>
        </Scrollbar>
      )}
      {items?.length === 0 && <NoResult />}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array,
  handleSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHide: PropTypes.func,
  onRemove: PropTypes.func,
  isEdit: PropTypes.bool,
  isIncome: PropTypes.bool,
  selected: PropTypes.string,
};

List.defaultProps = {
  items: null,
  handleSelect: Function.prototype,
  onMove: Function.prototype,
  onHide: Function.prototype,
  onRemove: Function.prototype,
  isEdit: false,
  isIncome: false,
  selected: null,
};
