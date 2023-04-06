import { call, put, takeLeading } from 'redux-saga/effects';

import { apiLogout, apiSignUser } from 'API/auth';
import { clearUser, setUserLoading, setUser } from 'REDUX/currentUser';
import { loginAction, setLoginError, setLoginSuccess, logoutAction } from 'REDUX/login';

function* login({ payload }) {
  put(setUserLoading(true));
  const { password, email } = payload;

  try {
    const user = yield call(apiSignUser, { email, password });

    yield put(setUser({ uid: user.uid, email: user.email }));
    yield put(setLoginSuccess());
  } catch (error) {
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    console.log(`error : `, error);
    yield put(setLoginError(error));
  }
}

function* logout() {
  put(setUserLoading(true));
  try {
    yield apiLogout();
    yield put(clearUser());
  } catch (e) {
    console.log('e : ', e);
  }
}
export default function* watchLoginSaga() {
  yield takeLeading(loginAction, login);
  yield takeLeading(logoutAction, logout);
}
