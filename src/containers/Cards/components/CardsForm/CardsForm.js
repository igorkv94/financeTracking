import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'COMPONENTS/common/Button';
import { ErrorsView } from 'COMPONENTS/common/ErrorsView/ErrorsView';
import { Icon } from 'COMPONENTS/common/Icon';
import { NumberField } from 'COMPONENTS/common/NumberField';
import { CurrencyCard } from 'COMPONENTS/CurrencyCard';

import { useCardsForm } from './helpers/useCardsForm';

import styles from './CardsForm.scss';

export function CardsForm({ data, onSubmitData }) {
  const { onChange, form, errors, onSubmit, onReset } = useCardsForm({ data, onSubmitData });

  return (
    <form className={styles.form}>
      {Object.keys(data || {}).map((key) => {
        return (
          <div key={key} className={styles.row}>
            <div className={styles.left}>
              <CurrencyCard name={key} />
            </div>
            <div className={styles.center}>
              <NumberField id={key} label="Amount" onChange={onChange} value={form[key]} withNegative />
            </div>
            <div className={styles.right}>
              <Icon name="reset" onClick={onReset(key)} size={40} iconSize={30} />
            </div>
          </div>
        );
      })}
      <ErrorsView errors={errors} />
      <div className={styles.row}>
        <Button isFullWidth onClick={onSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}

CardsForm.propTypes = {
  data: PropTypes.array,
  onSubmitData: PropTypes.func.isRequired,
};

CardsForm.defaultProps = {
  data: null,
};
