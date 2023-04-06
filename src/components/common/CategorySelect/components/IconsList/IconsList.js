import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Scrollbar } from 'COMPONENTS/common/Scrollbar';
import { Text } from 'COMPONENTS/common/Text';

import { items } from './helpers/smiles';

import styles from './IconsList.scss';

import parentStyles from '../List/List.scss';

export function IconsList({ onSelect, selectedIcon }) {
  const handleSelect = (value) => () => {
    onSelect(value);
  };

  const getList = () => {
    return Object.values(items).map(({ title, smiles }) => (
      <div key={title}>
        <div className={styles.titleWrapper}>
          <Text font="s14s">{title}</Text>
        </div>
        <div className={styles.iconsList}>
          {smiles.map((smile) => (
            <div
              key={smile}
              className={cx(styles.iconWrapper, { [styles.isActive]: selectedIcon === smile })}
              onClick={handleSelect(smile)}
            >
              <Text font="p24r">{smile}</Text>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={parentStyles.list}>
      <Scrollbar>{getList()}</Scrollbar>
    </div>
  );
}

IconsList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedIcon: PropTypes.string,
};

IconsList.defaultProps = {
  selectedIcon: null,
};
