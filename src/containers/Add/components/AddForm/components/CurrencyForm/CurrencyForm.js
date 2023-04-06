import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'COMPONENTS/common/Button';
import { Text } from 'COMPONENTS/common/Text';
import { CurrencyList } from 'COMPONENTS/CurrencyList';

import { useCurrencyForm } from './helpers/useCurrencyForm';

import styles from './CurrencyForm.scss';

import { SpecNumberField } from '../SpecNumberField';

export function CurrencyForm({ onExit }) {
  const { onChange, onSubmit } = useCurrencyForm({ onExit });

  return (
    <>
      <div className={styles.textWrapper}>
        <Text font="p18r" inRow={false}>
          Please, choose what card to create and input your initial amount on it. You can&apos;t have different cards
          with same currency.
        </Text>
      </div>
      <SpecNumberField onChange={onChange} />
      <div className={styles.wrapper}>
        <CurrencyList name="currency" onAdd={onExit} onChange={onChange} />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonWrapper}>
          <Button isFullWidth onClick={onExit}>
            Cancel
          </Button>
        </div>
        <div className={styles.buttonWrapper}>
          <Button isFullWidth onClick={onSubmit}>
            Add
          </Button>
        </div>
      </div>
    </>
  );
}

CurrencyForm.propTypes = { onExit: PropTypes.func };

CurrencyForm.defaultProps = { onExit: Function.prototype };
