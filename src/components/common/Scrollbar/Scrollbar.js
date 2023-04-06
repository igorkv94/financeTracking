import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useScrollbar } from 'COMPONENTS/common/Scrollbar/helpers/useScrollbar';

import styles from './Scrollbar.scss';

export function Scrollbar({ children, updatedLength }) {
  const { contentRef, scrollTrackRef, handleTrackClick, scrollThumbRef, thumbHeight } = useScrollbar({ updatedLength });

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
      <div className={styles.scrollbar}>
        <div className={styles.inner}>
          <div className={styles.track} ref={scrollTrackRef} onClick={handleTrackClick} />
          <div
            className={cx(styles.thumb, {
              [styles.disabled]: contentRef.current?.scrollHeight <= contentRef.current?.clientHeight,
            })}
            ref={scrollThumbRef}
            style={{
              height: `${thumbHeight}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  updatedLength: PropTypes.number,
};

Scrollbar.defaultProps = { children: null, updatedLength: null };
