import { takeLatest, put, call, all } from 'redux-saga/effects';

import { initDataAction, setUser, setUserLoading } from 'REDUX/currentUser';
import { fetchCategoriesData } from 'SAGA/categories';
import { fetchCurrency } from 'SAGA/currencies';
import { fetchSelectedCurrencyData } from 'SAGA/selectedCurrency';

function* initData({ payload }) {
  yield put(setUser(payload));

  yield all([call(fetchCategoriesData), call(fetchCurrency), call(fetchSelectedCurrencyData)]);

  yield put(setUserLoading(false));
}

export default function* watchCurrentUserSaga() {
  yield takeLatest(initDataAction, initData);
}
