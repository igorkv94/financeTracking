import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { AddedList } from 'COMPONENTS/AddedList/AddedList';
import { Button } from 'COMPONENTS/common/Button';
import { CategorySelect } from 'COMPONENTS/common/CategorySelect';
import { ErrorsView } from 'COMPONENTS/common/ErrorsView/ErrorsView';
import { CurrencyList } from 'COMPONENTS/CurrencyList';

import { useAddTransactions } from './helpers/useAddTransactions';

import { CategoriesForm } from './components/CategoriesForm';
import { CurrencyForm } from './components/CurrencyForm';
import { SpecNumberField } from './components/SpecNumberField';

import styles from './AddForm.scss';

export function AddForm({ isIncome, hasCurrencies, onSubmit, savedSuccess }) {
  const { onChange, formData, errors, handleSubmit, newTransactions } = useAddTransactions({
    isIncome,
    hasCurrencies,
    onSubmit,
    savedSuccess,
  });
  const [formType, setFormType] = useState('transaction');

  const isEditCategory = formType === 'category';
  const isEditCurrency = formType === 'currency';

  const changeFormType = (newType) => () => {
    setFormType(newType);
  };

  const Block = isEditCategory || isEditCurrency ? 'div' : 'form';

  return (
    <>
      <Block key={newTransactions.length} className={styles.form}>
        <div className={cx(styles.categoriesWrapper, { [styles.isEdit]: isEditCurrency })}>
          {isEditCurrency && <CurrencyForm onExit={changeFormType('transaction')} />}
          {!isEditCurrency && (
            <>
              <SpecNumberField onChange={onChange} />
              <div className={styles.wrapper}>
                <CurrencyList
                  name="currency"
                  onAdd={changeFormType('currency')}
                  onChange={onChange}
                  isActive
                  canHasAdd
                  defaultValue={formData.current.currency}
                />
              </div>
            </>
          )}
        </div>
        <div className={cx(styles.categoriesWrapper, { [styles.isEdit]: isEditCategory })}>
          {isEditCategory && <CategoriesForm isIncome={isIncome} onEdit={changeFormType('transaction')} />}
          {!isEditCategory && (
            <CategorySelect onChange={onChange} isIncome={isIncome} onEdit={changeFormType('category')} />
          )}
        </div>
        <ErrorsView errors={errors} />
        <div className={styles.button}>
          <Button isFullWidth onClick={handleSubmit} isDisabled={isEditCategory || isEditCurrency}>
            Add
          </Button>
        </div>
      </Block>
      <div className={styles.addedTable}>
        <AddedList data={newTransactions} />
      </div>
    </>
  );
}

AddForm.propTypes = {
  isIncome: PropTypes.bool,
  hasCurrencies: PropTypes.bool,
  savedSuccess: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

AddForm.defaultProps = {
  isIncome: false,
  hasCurrencies: false,
  savedSuccess: false,
};
