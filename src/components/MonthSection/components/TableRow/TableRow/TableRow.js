import PropTypes from 'prop-types';
import React from 'react';

import { IconWithText } from 'COMPONENTS/common/IconWithText';
import { Text } from 'COMPONENTS/common/Text';

import styles from './TableRow.scss';

import { TableRowLayer } from '../TableRowLayer';

export function TableRow({ category, amount, percent, color }) {
  return (
    <TableRowLayer
      columsData={[
        <div key={0} className={styles.color} style={{ backgroundColor: color }} />,
        <IconWithText key={1} categoryIcon={category.icon}>
          {category.name}
        </IconWithText>,
        <Text key={2} font="p18r">
          {amount}
        </Text>,
        <Text key={3} font="p18r">
          {percent}%
        </Text>,
      ]}
    />
  );
}

TableRow.propTypes = {
  category: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  isIncome: PropTypes.bool,
};

TableRow.defaultProps = {
  isIncome: false,
};
