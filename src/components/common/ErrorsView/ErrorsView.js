import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'COMPONENTS/common/Text';

import styles from './ErrorsView.scss';

export function ErrorsView({ errors }) {
  return (
    !!errors.length && (
      <div className={styles.errorsWrapper}>
        {errors.map((error) => (
          <div key={error.field}>
            {error.title && (
              <>
                <Text font="p13s">{error.title}</Text>
                <Text font="p13r"> - </Text>
              </>
            )}
            <Text font="p13r">{error.message}</Text>
          </div>
        ))}
      </div>
    )
  );
}

ErrorsView.propTypes = { errors: PropTypes.array };

ErrorsView.defaultProps = { errors: [] };
