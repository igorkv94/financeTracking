import cx from 'classnames';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import styles from './ListItem.scss';

export function NoResult() {
  return (
    <div className={cx(styles.item, styles.noResult)}>
      <Text font="p16r">No categories</Text>
    </div>
  );
}
