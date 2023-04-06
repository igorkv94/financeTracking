import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TableRowLayer.scss';

export function TableRowLayer({ columsData, isTitle }) {
  return (
    <div className={cx(styles.row, { [styles.rowTitle]: isTitle })}>
      <div className={cx(styles.cell, styles.colorCell)}>{columsData[0]}</div>

      <div className={cx(styles.cell, styles.cat)}>{columsData[1]}</div>

      <div className={styles.cell}>{columsData[2]}</div>

      <div className={cx(styles.cell, styles.perc)}>{columsData[3]}</div>
    </div>
  );
}

TableRowLayer.propTypes = {
  columsData: PropTypes.array.isRequired,
  isTitle: PropTypes.bool,
};

TableRowLayer.defaultProps = {
  isTitle: false,
};
