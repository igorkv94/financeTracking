import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onApiAuthChanged } from 'API/auth';
import { clearUser, initDataAction, setUserLoading } from 'REDUX/currentUser';

export function useAuth() {
  const dispatch = useDispatch();
  const loadingAuth = useSelector((state) => state.currentUser.loading);

  const handleAuth = (user) => {
    if (user) {
      const { email, uid, metadata } = user;
      dispatch(initDataAction({ email, uid, creationTime: new Date(metadata.creationTime).getTime() }));
    } else {
      dispatch(clearUser());
      dispatch(setUserLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setUserLoading(true));
    onApiAuthChanged(handleAuth);
  }, []);

  return { loadingAuth };
}
