import { useEffect, useRef, useState } from 'react';

import { showToast } from 'UTILS/showToast';

import { getErrors } from 'CONTAINERS/Add/components/AddForm/helpers/getErrors';

export function useAddTransactions({ isIncome, hasCurrencies, onSubmit, savedSuccess }) {
  const defaultData = { amount: 0, category: '', currency: null };
  const formData = useRef(defaultData);
  const [errors, setErrors] = useState([]);
  const [newTransactions, setNewTransactions] = useState([]);

  useEffect(() => {
    if (savedSuccess) {
      const newTransaction = { ...formData.current, isIncome };

      setNewTransactions([{ ...newTransaction, date: Date.now() }, ...newTransactions]);
      formData.current = defaultData;
      showToast('Saved', 'success');
    }
  }, [savedSuccess]);

  const clearError = (field) => {
    if (errors.length) {
      setErrors((prev) => prev.filter((error) => error.field !== field));
    }
  };

  const onChange = (field, value) => {
    formData.current[field] = value;
    clearError(field);
  };

  const handleSubmit = () => {
    const newErrors = getErrors(formData.current, hasCurrencies);
    setErrors(newErrors);

    if (!newErrors.length) {
      onSubmit(formData.current);
    }
  };
  return { onChange, formData, errors, handleSubmit, newTransactions };
}
