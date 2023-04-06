import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from 'COMPONENTS/Title';
import { addNewTransactionAction, setSuccessSaved } from 'REDUX/transactions';

import { AddForm } from './components/AddForm';

import styles from './Add.scss';

export default function Add({ isIncome }) {
  const hasCurrencies = !!useSelector((state) => state.currencies.list.length);
  const dispatch = useDispatch();
  const savedSuccess = useSelector((state) => state.transactions.savedSuccess);

  useEffect(() => {
    if (savedSuccess) {
      dispatch(setSuccessSaved(false));
    }
  }, [savedSuccess]);

  const onSubmit = (formData) => {
    dispatch(addNewTransactionAction(formData));
  };

  return (
    <div className="page">
      <Title title="Add transaction" hasHome />
      <div className={styles.inner}>
        <AddForm isIncome={isIncome} hasCurrencies={hasCurrencies} onSubmit={onSubmit} savedSuccess={savedSuccess} />
      </div>
    </div>
  );
}

Add.propTypes = {
  isIncome: PropTypes.bool,
};

Add.defaultProps = {
  isIncome: false,
};
