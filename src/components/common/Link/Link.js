import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Text } from 'COMPONENTS/common/Text';

import styles from './Link.scss';

export function Link({ children, to, font, className, target }) {
  const getContent = () => {
    if (font) {
      return <Text font={font}>{children}</Text>;
    }

    return children;
  };

  return (
    <RouterLink to={to} className={cx(styles.link, className)} target={target}>
      {getContent()}
    </RouterLink>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  to: PropTypes.string.isRequired,
  font: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.string,
};

Link.defaultProps = { children: null, font: null, className: null, target: null };
