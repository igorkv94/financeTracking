import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { SizeContext } from 'UTILS/contexts';

import { getFont } from './helpers/getFont';

import styles from './Text.scss';

export function Text({ font, smallDesktopFont, tabletFont, mobileFont, color, children, inRow }) {
  const { size } = useContext(SizeContext);

  const curFont = getFont({ size, mobileFont, tabletFont, smallDesktopFont, font });

  return (
    <>
      <span style={{ color: color }} className={cx(styles[curFont], { [styles.inRow]: inRow })}>
        {children}
      </span>
    </>
  );
}

Text.propTypes = {
  font: PropTypes.string,
  smallDesktopFont: PropTypes.string,
  tabletFont: PropTypes.string,
  mobileFont: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.number, PropTypes.string]).isRequired,
  inRow: PropTypes.bool,
};

Text.defaultProps = {
  font: 'p13r',
  smallDesktopFont: null,
  tabletFont: null,
  mobileFont: null,
  color: null,
  inRow: true,
};
