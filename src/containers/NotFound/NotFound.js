import React from 'react';

import { Link } from 'COMPONENTS/common/Link';
import { Text } from 'COMPONENTS/common/Text';

import styles from './NotFound.scss';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Text font="s50s">Not found</Text>
      </div>
      <div className={styles.content}>
        <div className={styles.gifWrapper}>
          <iframe
            src="https://giphy.com/embed/nC4oHvyt4ng4bsZZzA"
            width="100%"
            height="100%"
            frameBorder="0"
            className={styles.giphy}
            allowFullScreen
          />
        </div>
        <div className={styles.author}>
          <Link
            target="_blank"
            to="https://giphy.com/gifs/IntoAction-mental-health-wellbeing-crisis-nC4oHvyt4ng4bsZZzA"
          >
            via GIPHY
          </Link>
        </div>
      </div>
    </div>
  );
}
