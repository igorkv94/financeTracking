import { call, put, takeLeading } from 'redux-saga/effects';

import { apiCreateUser } from 'API/auth';
import { setUser } from 'REDUX/currentUser';
import { signUpAction, signUpError, setSignUpSuccess } from 'REDUX/registration';

function* registrateUser({ payload }) {
  const { password, email } = payload;
  try {
    const user = yield call(apiCreateUser, { email, password });

    yield put(setUser({ uid: user.uid, email: user.email }));
    yield put(setSignUpSuccess());
  } catch (error) {
    yield put(signUpError({ error }));
  }
}

export default function* watchRegistrationSaga() {
  yield takeLeading(signUpAction, registrateUser);
}
