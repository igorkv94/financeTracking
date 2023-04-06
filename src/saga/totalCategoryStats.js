import { takeLatest, put, select, call } from 'redux-saga/effects';

import { apiGetTotalCategoryStatistics } from 'API/totalCategoryStatistics';
import { fetchTotalStatsAction, setTotalStats } from 'REDUX/totalCategoryStats';

import { getConvertedStats } from './helpers/getConvertedStats';

function* fetchTotalStats() {
  const state = yield select();
  const { data } = yield call(apiGetTotalCategoryStatistics, { userId: state.currentUser.uid });
  const currencyData = data[state.selectedCurrency.currency];

  if (!currencyData) {
    yield put(setTotalStats({}));
    return;
  }

  yield put(setTotalStats(getConvertedStats(currencyData)));
}

export default function* watchTotalStatsSaga() {
  yield takeLatest(fetchTotalStatsAction, fetchTotalStats);
}
