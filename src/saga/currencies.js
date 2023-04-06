import { takeLatest, takeLeading, put, select, call } from 'redux-saga/effects';

import { apiAddNewCurrency, apiGetCurrencies } from 'API/currencies';
import { apiGetCurrencyStatistics, apiSetCurrentCurrencyStatistics } from 'API/currencyStatistics';
import {
  fetchCurrencyStatsAction,
  setCurrencyStats,
  updateCurrenciesList,
  updateCurrentCurrencyStats,
  addNewCurrencyAction,
  updateCurrencyStatsAction,
  setNewCurrency,
} from 'REDUX/currencies';
import { changeSelectedCurrencyAction } from 'REDUX/selectedCurrency';

export function* fetchCurrency() {
  const state = yield select();
  const { data } = yield call(apiGetCurrencies, { userId: state.currentUser.uid });

  yield put(updateCurrenciesList(data));
}

function* fetchCurrencyStats() {
  const state = yield select();
  const { data } = yield call(apiGetCurrencyStatistics, { userId: state.currentUser.uid });

  yield put(setCurrencyStats(data));
}

function* addNewCurrency({ payload }) {
  const state = yield select();
  yield call(apiAddNewCurrency, { userId: state.currentUser.uid, currentCurrency: payload });

  yield put(changeSelectedCurrencyAction(payload.currency));

  yield put(setNewCurrency(payload));
}

function* updateCurrencyStats({ payload }) {
  const state = yield select();
  yield call(apiSetCurrentCurrencyStatistics, { userId: state.currentUser.uid, currentStatistics: payload });

  yield put(updateCurrentCurrencyStats(payload));
}

export default function* watchCurrenciesSaga() {
  yield takeLatest(fetchCurrencyStatsAction, fetchCurrencyStats);
  yield takeLeading(addNewCurrencyAction, addNewCurrency);
  yield takeLeading(updateCurrencyStatsAction, updateCurrencyStats);
}
