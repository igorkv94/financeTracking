import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';

import { Text } from 'COMPONENTS/common/Text';
import { Title } from 'COMPONENTS/Title';
import { addNewExchangeAction, setSuccessSaved } from 'REDUX/exchanges';

import { ExchangeForm } from './components/ExchangeForm';

import styles from './AddExchange.scss';

export default function AddExchange() {
  const dispatch = useDispatch();
  const savedSuccess = useSelector((state) => state.exchanges.savedSuccess);
  const activeCurrencyList = useSelector((state) => state.currencies.list);

  useEffect(() => {
    if (savedSuccess) {
      dispatch(setSuccessSaved(false));
      showToast('Saved', 'success');
    }
  }, [savedSuccess]);

  const onSubmit = (formData) => {
    dispatch(addNewExchangeAction(formData));
  };

  return (
    <div className="page">
      <Title title="Exchange" hasHome />
      <div className={styles.inner}>
        {activeCurrencyList?.length > 1 ? (
          <ExchangeForm onSubmit={onSubmit} savedSuccess={savedSuccess} />
        ) : (
          <Text font="s20r">You have to add at least 2 currencies</Text>
        )}
      </div>
    </div>
  );
}
