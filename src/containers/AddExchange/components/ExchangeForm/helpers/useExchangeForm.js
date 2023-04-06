import { useEffect, useRef, useState } from 'react';

import { showToast } from 'UTILS/showToast';

import { getErrors } from './getErrors';

export function useExchangeForm({ onSubmit, savedSuccess }) {
  const defaultData = {
    fromCurrency: null,
    fromValue: '',
    exchangeRate: '',
    toValue: '',
    toCurrency: null,
  };

  const formData = useRef(defaultData);
  const [fromValue, setFromValue] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState('');
  const [errors, setErrors] = useState([]);
  const [newExchanges, setNewExchanges] = useState([]);

  useEffect(() => {
    if (savedSuccess) {
      setNewExchanges([{ date: Date.now(), ...formData.current }, ...newExchanges]);
      showToast('Saved', 'success');
    }
  }, [savedSuccess]);

  const clearError = (field) => {
    const actualField = field === 'fromCurrency' ? 'toCurrency' : field;
    if (errors.length) {
      setErrors((prev) => prev.filter((error) => error.field !== actualField));
    }
  };

  const calcTotal = () => {
    const { fromValue, exchangeRate } = formData.current;
    const fromValueNumber = Math.round(parseInt(fromValue, 10) * 100);
    const exchangeRateNumber = Math.round(parseFloat(exchangeRate) * 100);
    return (fromValueNumber * exchangeRateNumber) / 10000 || 0;
  };

  const calcRate = () => {
    const { fromValue, toValue } = formData.current;
    const toValueNumber = Math.round(parseInt(toValue, 10) * 100);
    const fromValueNumber = Math.round(parseInt(fromValue, 10) * 100);

    return parseFloat((toValueNumber / fromValueNumber).toFixed(2)) || 0.1;
  };

  const onChange = (field, value) => {
    formData.current[field] = value;

    if (field === 'fromValue') {
      setFromValue(value);
      const newTotal = calcTotal().toString();
      setTotal(newTotal);
      formData.current.toValue = newTotal;
    }
    if (field === 'exchangeRate') {
      setRate(value);
      const newTotal = calcTotal().toString();
      setTotal(newTotal);
      formData.current.toValue = newTotal;
    }
    if (field === 'toValue') {
      setTotal(value);
      const newRate = calcRate().toString();
      setRate(newRate);
      formData.current.exchangeRate = newRate;
    }
    formData.current[field] = value;
    clearError(field);
  };

  const handleSubmit = () => {
    const newErrors = getErrors(formData.current);
    setErrors(newErrors);
    if (!newErrors.length) {
      formData.current.fromValue = parseInt(formData.current.fromValue);
      formData.current.toValue = parseInt(formData.current.toValue);
      onSubmit(formData.current);
    }
  };

  return { onChange, fromValue, rate, total, errors, handleSubmit, newExchanges };
}
