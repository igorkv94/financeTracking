import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';
import { changeSelectedCurrencyAction } from 'REDUX/selectedCurrency';

import styles from './Currency.scss';

export function Currency() {
  const dispatch = useDispatch();
  const activeCurrencyList = useSelector((state) => state.currencies.list);
  const selectedCurrency = useSelector((state) => state.selectedCurrency.currency);

  const wrapperRef = useRef();
  const [isOpen, setOpen] = useState(false);

  const onClickOutside = (event) => {
    if (!wrapperRef.current.contains(event.target)) {
      toggleOpen();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', onClickOutside, false);
    }
    return () => {
      document.removeEventListener('click', onClickOutside, false);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    if (activeCurrencyList.length > 1) {
      setOpen((prev) => !prev);
    }
  };

  const onSelect = (name) => () => {
    dispatch(changeSelectedCurrencyAction(name));
    toggleOpen();
  };

  if (!selectedCurrency) {
    return '';
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {isOpen && (
        <div className={styles.listWrapper}>
          {activeCurrencyList.map(({ id, code }) => (
            <div key={id} className={styles.currency} onClick={onSelect(code)}>
              <div className={styles.iconWrapper}>
                <Icon name={code} size={24} />
              </div>
              <Text font="p20s">{code}</Text>
            </div>
          ))}
        </div>
      )}
      <Icon name={selectedCurrency} size={40} iconSize={35} onClick={toggleOpen} fill="var(--color-dark-brown)" />
    </div>
  );
}
