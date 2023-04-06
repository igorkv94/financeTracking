import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { resetFields } from 'UTILS/resetFields';

import { Top } from './components/Top';

import styles from './EditCategoriesView.scss';

import { IconsList } from '../IconsList';
import { List } from '../List';

export function EditCategoriesView({ activeItems, onAdd, onHide, onMove, onEdit, onRemove }) {
  const [isShowingIcons, showIcons] = useState(false);
  const formRef = useRef();

  const name = useRef(null);

  const onIconSelect = (value) => {
    onAdd({ name: name.current, icon: value });
    showIcons(false);
    resetFields(formRef.current);
  };

  const onNameChange = (value) => {
    name.current = value;
  };

  return (
    <form ref={formRef} className={styles.wrapper}>
      <Top
        activeItems={activeItems}
        name={name.current}
        onNameChange={onNameChange}
        showIcons={showIcons}
        isShowingIcons={isShowingIcons}
        onEdit={onEdit}
      />
      {isShowingIcons && <IconsList onSelect={onIconSelect} />}
      {!isShowingIcons && <List items={activeItems} onHide={onHide} onMove={onMove} onRemove={onRemove} isEdit />}
    </form>
  );
}

EditCategoriesView.propTypes = {
  activeItems: PropTypes.array,
  onAdd: PropTypes.func,
  onMove: PropTypes.func,
  onHide: PropTypes.func,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};

EditCategoriesView.defaultProps = {
  activeItems: null,
  onAdd: Function.prototype,
  onMove: Function.prototype,
  onHide: Function.prototype,
  onRemove: Function.prototype,
  onEdit: Function.prototype,
};
