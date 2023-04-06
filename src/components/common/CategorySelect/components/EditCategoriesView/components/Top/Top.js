import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { showToast } from 'UTILS/showToast';

import { Button } from 'COMPONENTS/common/Button';
import { Icon } from 'COMPONENTS/common/Icon';
import { TextField } from 'COMPONENTS/common/TextField';

import styles from './Top.scss';

export function Top({ activeItems, onNameChange, showIcons, isShowingIcons, onEdit }) {
  const name = useRef(null);
  const [hasNameError, setHasNameError] = useState(false);

  const handleChange = (field, value) => {
    setHasNameError(false);
    name.current = value;
    onNameChange(value);
  };

  const onShowIcons = () => {
    if (!isShowingIcons) {
      if (!name.current?.length) {
        showToast('Please, input valid category', 'error');
        setHasNameError(true);
        return;
      }
      if (activeItems.find((category) => category.name === name.current)) {
        showToast('You already have one', 'error');
        setHasNameError(true);
        return;
      }
    }
    showIcons(!isShowingIcons);
  };

  return (
    <div className={styles.top}>
      <div className={styles.textField}>
        <TextField
          id="newType"
          label="New category"
          onChange={handleChange}
          isDisabled={isShowingIcons}
          hasError={hasNameError}
        />
      </div>
      <Button className={styles.iconButton} onClick={onShowIcons} isActive={isShowingIcons}>
        <Icon name="plus" size={35} />
      </Button>
      <Button className={styles.iconButton} onClick={onEdit} isActive>
        <Icon name="pencil" size={35} />
      </Button>
    </div>
  );
}

Top.propTypes = {
  activeItems: PropTypes.array,
  onNameChange: PropTypes.func,
  showIcons: PropTypes.func,
  isShowingIcons: PropTypes.bool,
  isIncome: PropTypes.bool,
  onEdit: PropTypes.func,
};

Top.defaultProps = {
  activeItems: Function.prototype,
  onNameChange: Function.prototype,
  showIcons: Function.prototype,
  isShowingIcons: false,
  isIncome: false,
  onEdit: Function.prototype,
};
