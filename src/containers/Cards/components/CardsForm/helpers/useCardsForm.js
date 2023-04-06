import { useMemo, useState } from 'react';

import { getErrors } from './getErrors';

export function useCardsForm({ data, onSubmitData }) {
  const defaultData = useMemo(
    () =>
      Object.entries(data || {}).reduce((result, [key, value]) => {
        result[key] = `${value.current}`;
        return result;
      }, {}),
    [],
  );

  const [form, setForm] = useState(defaultData);
  const [errors, setErrors] = useState([]);

  const clearError = (field) => {
    const actualField = field === 'fromCurrency' ? 'toCurrency' : field;
    if (errors.length) {
      setErrors((prev) => prev.filter((error) => error.field !== actualField));
    }
  };

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value || '' }));
    clearError(field);
  };

  const onSubmit = () => {
    const newErrors = getErrors(data, form);
    setErrors(newErrors);
    if (!newErrors.length) {
      const newData = Object.keys(form).reduce((result, key) => {
        result[key] = parseInt(form[key], 10);
        return result;
      }, {});

      onSubmitData(newData);
    }
  };

  const onReset = (code) => () => {
    const info = data[code];
    const newValue = info.income + info.exchangedIn - info.expend - info.exchangedOut;

    setForm((prev) => ({ ...prev, [code]: newValue }));
  };

  return { onChange, form, errors, onSubmit, onReset };
}
