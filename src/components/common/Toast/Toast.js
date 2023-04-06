import cx from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import { useToast } from './helpers/useToast';

import styles from './Toast.scss';

export function Toast() {
  const { toast, isSuccess } = useToast();

  return (
    <div className={styles.toastWrapper}>
      <CSSTransition
        classNames={{
          enterActive: styles.animEnterActive,
          enter: styles.animEnter,
          exit: styles.animExit,
        }}
        in={toast.isActive}
        unmountOnExit
        timeout={300}
      >
        <div className={cx(styles.toast, { [styles.success]: isSuccess, [styles.error]: !isSuccess })}>
          <div className={styles.toastInner}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <Icon
                  name={isSuccess ? 'success' : 'error'}
                  fill={isSuccess ? 'green' : 'rgba(203, 18, 18, 0.8)'}
                  size={20}
                />
              </div>
              <Text font={isSuccess ? 'p18s' : 'p18r'}>{toast.text}</Text>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
