import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from 'CONSTS/routes';

export function ProtectedRoute({ isForGuest }) {
  const isAuthorized = useSelector((state) => !!state.currentUser.uid);

  if ((!isAuthorized && !isForGuest) || (isForGuest && isAuthorized)) {
    return <Navigate to={isForGuest ? ROUTES.MAIN : ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  isForGuest: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  isForGuest: false,
};
