import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Icon } from 'COMPONENTS/common/Icon/index';

export function IconLink({ to, size, icon, iconSize, fill }) {
  return (
    <RouterLink to={to}>
      <Icon name={icon} fill={fill} size={size} iconSize={iconSize} hasHover />
    </RouterLink>
  );
}

IconLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  fill: PropTypes.string,
  size: PropTypes.number,
  iconSize: PropTypes.number,
};

IconLink.defaultProps = { fill: undefined, size: undefined, iconSize: undefined };
