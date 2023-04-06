import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from 'COMPONENTS/common/Icon';
import { Text } from 'COMPONENTS/common/Text';

import styles from './ListItem.scss';

export function ListItem({
  id,
  name,
  icon,
  handleSelect,
  onHide,
  onRemove,
  onMove,
  isEdit,
  isSelected,
  hasMoveTop,
  hasMoveDown,
  isVisible,
  isNew,
}) {
  const handleClick = () => {
    handleSelect(id, name);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handleHide = () => {
    onHide(id);
  };

  const handleMove = (isUp) => () => {
    onMove(id, isUp);
  };

  return (
    <div key={name} className={cx(styles.item, { [styles.selected]: isSelected })} onClick={handleClick}>
      <div className={styles.categoryIcon}>{icon}</div>
      <Text font="p16r">{name}</Text>
      {isEdit && (
        <div className={styles.icons}>
          <div className={styles.icon}>
            <Icon name="up" size={30} iconSize={25} onClick={handleMove(true)} disabled={!hasMoveTop} />
          </div>
          <div className={styles.icon}>
            <Icon name="down" size={30} iconSize={25} onClick={handleMove(false)} disabled={!hasMoveDown} />
          </div>
          <div className={styles.icon}>
            {isNew && <Icon name="remove" size={30} iconSize={25} onClick={handleRemove} />}
            {!isNew && <Icon name={isVisible ? 'eye' : 'eye_off'} size={30} iconSize={25} onClick={handleHide} />}
          </div>
        </div>
      )}
    </div>
  );
}

ListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  handleSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHide: PropTypes.func,
  onRemove: PropTypes.func,
  isEdit: PropTypes.bool,
  isSelected: PropTypes.bool,
  hasMoveTop: PropTypes.bool,
  hasMoveDown: PropTypes.bool,
  isVisible: PropTypes.bool,
  isNew: PropTypes.bool,
};

ListItem.defaultProps = {
  id: null,
  name: null,
  icon: null,
  handleSelect: Function.prototype,
  onMove: Function.prototype,
  onHide: Function.prototype,
  onRemove: Function.prototype,
  isEdit: false,
  isSelected: false,
  hasMoveTop: false,
  hasMoveDown: false,
  isVisible: false,
  isNew: false,
};
