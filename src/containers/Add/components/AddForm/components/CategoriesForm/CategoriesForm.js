import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'COMPONENTS/common/Button';
import { EditCategories } from 'COMPONENTS/common/CategorySelect';

import { useCategoriesForm } from './helpers/useCategoriesForm';

import styles from './CategoriesForm.scss';

export function CategoriesForm({ isIncome, onEdit }) {
  const { activeItems, setActiveItems, onSave } = useCategoriesForm({ isIncome, onEdit });

  return (
    <div className={styles.form}>
      <EditCategories activeItems={activeItems} setActiveItems={setActiveItems} isIncome={isIncome} onEdit={onEdit} />
      <div className={styles.button}>
        <Button isFullWidth onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

CategoriesForm.propTypes = {
  isIncome: PropTypes.bool,
  onEdit: PropTypes.func,
};

CategoriesForm.defaultProps = {
  isIncome: false,
  onEdit: Function.prototype,
};
