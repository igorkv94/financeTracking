import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { AddedList } from 'COMPONENTS/AddedList/AddedList';
import { Button } from 'COMPONENTS/common/Button';
import { ErrorsView } from 'COMPONENTS/common/ErrorsView/ErrorsView';
import { Icon } from 'COMPONENTS/common/Icon';
import { NumberField } from 'COMPONENTS/common/NumberField';
import { Text } from 'COMPONENTS/common/Text';
import { CurrencyList } from 'COMPONENTS/CurrencyList';

import { useExchangeForm } from './helpers/useExchangeForm';

import styles from './ExchangeForm.scss';

export function ExchangeForm({ onSubmit, savedSuccess }) {
  const { onChange, fromValue, rate, total, errors, handleSubmit, newExchanges } = useExchangeForm({
    onSubmit,
    savedSuccess,
  });

  return (
    <>
      <form className={styles.form}>
        <div className={styles.currencyWrapper}>
          <Text font="p18r">From</Text>
          <div className={styles.list}>
            <CurrencyList name="fromCurrency" onChange={onChange} isActive />
          </div>
        </div>
        <div className={cx(styles.fields, styles.bigMargin)}>
          <NumberField id="fromValue" label="Amount" onChange={onChange} value={fromValue} />
          <div className={styles.iconWrapper}>
            <Icon name="remove" fill="var(--color-svg)" size={40} />
          </div>
          <NumberField id="exchangeRate" label="Rate" onChange={onChange} value={rate} withDecimal />
          <div className={styles.iconWrapper}>
            <Icon name="equil" fill="var(--color-svg)" size={40} />
          </div>
          <NumberField id="toValue" label="Total" onChange={onChange} value={total} />
        </div>
        <div className={cx(styles.currencyWrapper, styles.bigMargin)}>
          <Text font="p18r">To</Text>
          <div className={styles.list}>
            <CurrencyList name="toCurrency" onChange={onChange} isActive />
          </div>
        </div>
        <ErrorsView errors={errors} />
        <div className={styles.bigMargin}>
          <Button isFullWidth onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </form>
      <div className={styles.addedTable}>
        <AddedList data={newExchanges} isExchanges />
      </div>
    </>
  );
}

ExchangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  savedSuccess: PropTypes.bool,
};

ExchangeForm.defaultProps = {
  savedSuccess: false,
};
