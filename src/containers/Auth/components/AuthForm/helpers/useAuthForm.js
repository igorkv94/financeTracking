import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { getErrors } from './getErrors';

export function useAuthForm({ isLogin, onSubmit }) {
  const errorFromServer = useSelector((state) => (isLogin ? state.login.error : state.registration.error));

  const defaultData = { email: 'p@p.com', password: 'password', confirmPassword: '' };
  const formData = useRef(defaultData);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errorFromServer?.message) {
      setErrors([errorFromServer]);
    }
  }, [errorFromServer?.message]);

  const clearError = (changedField) => {
    if (errors.length) {
      setErrors(
        errors.filter((error) => {
          if (error.field === 'confirmPassword' && changedField === 'password') {
            return false;
          }

          return error.field !== changedField;
        }),
      );
    }
  };

  const onChange = (field, value) => {
    formData.current[field] = value;

    clearError(field);
  };

  const handleSubmit = () => {
    const newErrors = getErrors(formData.current, isLogin);
    setErrors(newErrors);

    if (!newErrors.length) {
      const { password, email } = formData.current;
      onSubmit({ password, email });
    }
  };

  return {
    onChange,
    handleSubmit,
    errors,
  };
}
