import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { currencyInfo } from 'CONSTS/currencyInfo';

import { CurrencyListView } from './components/CurrencyListView';

export function CurrencyList({ name, onChange, onAdd, isActive, canHasAdd, defaultValue }) {
  const activeCurrencyList = useSelector((state) => state.currencies.list);
  const allCurrencies = Object.keys(currencyInfo);

  const getInactive = () => {
    return allCurrencies.reduce((result, key) => {
      const isInactive = !activeCurrencyList.filter((item) => {
        return item.code === key;
      }).length;

      if (isInactive) {
        result.push({ id: key, ...currencyInfo[key] });
      }

      return result;
    }, []);
  };

  return (
    <CurrencyListView
      name={name}
      list={isActive ? activeCurrencyList : getInactive()}
      onChange={onChange}
      onAdd={onAdd}
      hasAdd={canHasAdd && activeCurrencyList.length < allCurrencies.length}
      defaultValue={defaultValue}
    />
  );
}

CurrencyList.propTypes = {
  name: PropTypes.string.isRequired,
  hasAdd: PropTypes.bool,
  isActive: PropTypes.bool,
  canHasAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

CurrencyList.defaultProps = {
  hasAdd: false,
  isActive: false,
  canHasAdd: false,
  onAdd: Function.prototype,
  onChange: Function.prototype,
  defaultValue: null,
};
