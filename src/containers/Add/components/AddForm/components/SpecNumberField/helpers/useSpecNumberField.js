import { useState } from 'react';

export function useSpecNumberField({ onChange }) {
  const SLIDE_STEP = 5;
  const MAX_VALUE = 100;

  const [textValue, setTextValue] = useState('0');
  const [rangeValue, setRangeValue] = useState(0);
  const [activeChip, setActiveChip] = useState();

  const maxValue = activeChip * 1.25 || MAX_VALUE;
  const slideStep = maxValue * 0.05 || SLIDE_STEP;

  const setValue = (value) => {
    const newValue = value ? parseInt(value, 10) : value;
    const roundValue = newValue && Math.round(newValue);
    onChange('amount', roundValue);
    setTextValue(roundValue);
    setRangeValue(newValue || 0);
  };

  const handleChange = (e) => {
    const value = e.target.value.trim();

    if (!value.length) {
      setValue('');
      return;
    }

    if (/^[0-9\b]+$/.test(value)) {
      setValue(value);
    }
  };

  const handleRange = (e) => {
    setValue(e.target.value.trim());
  };

  const getStep = (prevValue) => {
    if (prevValue < 100) {
      return 1;
    }
    if (prevValue < 1000) {
      return 5;
    }

    const numberOfDigits = prevValue.toString().length;
    return Math.pow(10, numberOfDigits - 3);
  };

  const handleStep = (isUp) => (e) => {
    const numValue = parseInt(textValue, 10) || 0;
    const currentStep = getStep(numValue);
    let newValue = numValue + currentStep * (isUp ? 1 : -1);
    if (newValue < 0) {
      newValue = 0;
    }
    setValue(newValue);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChip = (item) => () => {
    setActiveChip(item);
    setValue(item);
  };

  return { handleChip, activeChip, handleStep, textValue, handleChange, rangeValue, handleRange, maxValue, slideStep };
}
