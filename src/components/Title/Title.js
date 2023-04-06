import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { IconLink } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './Title.scss';

export function Title({ title, withBorder, rightElem, hasHome }) {
  return (
    <div className={cx(styles.titleWrapper, { [styles.withBorder]: withBorder })}>
      <div className={styles.left}>{hasHome && <IconLink to={ROUTES.MAIN} icon="home" size={40} iconSize={30} />}</div>
      <div className={styles.center}>
        <Text font="s30s" mobileFont="s24s">
          {title}
        </Text>
      </div>
      <div className={styles.right}>{rightElem}</div>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  withBorder: PropTypes.bool,
  hasHome: PropTypes.bool,
  rightElem: PropTypes.element,
};

Title.defaultProps = { title: null, withBorder: true, hasHome: false, rightElem: null };
