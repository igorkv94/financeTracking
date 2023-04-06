import { takeLatest, put, select, call } from 'redux-saga/effects';

import { apiGetMonthCategoryStatistics } from 'API/monthCategoryStatistics';
import { fetchMonthCategoryStatsAction, setMonthCategoryStats } from 'REDUX/monthCategoryStats';

import { getConvertedStats } from './helpers/getConvertedStats';

// payload is {month: 2022-06}
function* fetchMonthCategoryStats({ payload }) {
  const state = yield select();
  const { month } = payload;
  const response = yield call(apiGetMonthCategoryStatistics, {
    userId: state.currentUser.uid,
    month,
    currency: state.selectedCurrency.currency,
  });

  if (!Object.keys(response).length) {
    yield put(setMonthCategoryStats([]));
    return;
  }

  yield put(setMonthCategoryStats(getConvertedStats(response)));
}

export default function* watchMonthCategoryStatsSaga() {
  yield takeLatest(fetchMonthCategoryStatsAction, fetchMonthCategoryStats);
}
