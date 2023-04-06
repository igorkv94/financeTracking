import { takeLatest, put, select, call } from 'redux-saga/effects';

import { apiGetSelectedCurrency, apiSetSelectedCurrency } from 'API/selectedCurrency';
import { changeSelectedCurrencyAction, setSelectedCurrency } from 'REDUX/selectedCurrency';

export function* fetchSelectedCurrencyData() {
  const state = yield select();
  const { data } = yield call(apiGetSelectedCurrency, { userId: state.currentUser.uid });

  yield put(setSelectedCurrency(data));
}

function* changeSelectedCurrency({ payload }) {
  const state = yield select();

  yield call(apiSetSelectedCurrency, {
    userId: state.currentUser.uid,
    newSelectedCurrency: payload,
  });

  yield put(setSelectedCurrency(payload));
}

export default function* watchSelectedCurrencySaga() {
  yield takeLatest(changeSelectedCurrencyAction, changeSelectedCurrency);
}
