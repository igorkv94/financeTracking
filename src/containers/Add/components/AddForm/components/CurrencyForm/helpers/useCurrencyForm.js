import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';

import { addNewCurrencyAction, resetSuccess } from 'REDUX/currencies';

export function useCurrencyForm({ onExit }) {
  const dispatch = useDispatch();
  const successSaved = useSelector((state) => state.currencies.successSaved);

  const defaultData = { amount: 0, currency: null };
  const formData = useRef(defaultData);

  const onChange = (field, value) => {
    formData.current[field] = value;
  };

  const onSubmit = () => {
    dispatch(addNewCurrencyAction(formData.current));
  };

  useEffect(() => {
    if (successSaved) {
      dispatch(resetSuccess());
      showToast('Saved', 'success');
      onExit();
    }
  }, [successSaved]);

  return { onChange, onSubmit };
}
