import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './DesktopTableRowLayer.scss';

export function DesktopTableRowLayer({ isExchanges, columnsData, isTitles, gridRow }) {
  return (
    <>
      {columnsData[0] && (
        <div className={cx(styles.cell, { [styles.date]: !isTitles })} style={{ gridRow }}>
          {columnsData[0]}
        </div>
      )}
      <div className={cx(styles.innerGrid, { [styles.withBorder]: !isTitles })}>
        <div className={cx(styles.cell, { [styles.indent]: !isExchanges && isTitles })}>{columnsData[1]}</div>
        <div className={cx(styles.cell, { [styles.indent]: !isExchanges && isTitles })}>{columnsData[2]}</div>
        <div className={styles.cell}>{columnsData[3]}</div>
        <div className={cx(styles.cell, styles.iconsWrapper)}>{columnsData[4]}</div>
      </div>
    </>
  );
}

DesktopTableRowLayer.propTypes = {
  isExchanges: PropTypes.bool,
  isTitles: PropTypes.bool,
  columnsData: PropTypes.array.isRequired,
  gridRow: PropTypes.string,
};

DesktopTableRowLayer.defaultProps = {
  isExchanges: false,
  isTitles: false,
};
