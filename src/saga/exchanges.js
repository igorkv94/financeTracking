import { takeLatest, takeLeading, put, select, call } from 'redux-saga/effects';

import { apiGetExchanges, apiChangesInExchange } from 'API/exchanges';
import { setCurrencyStatsChangesByExchanges } from 'REDUX/currencies';
import {
  fetchExchangesAction,
  addNewExchangeAction,
  setExchanges,
  setMoreExchanges,
  removeCurrentExchange,
  removeExchangeAction,
  setSuccessSaved,
} from 'REDUX/exchanges';

import { convertExchanges, saveToStorage } from './helpers/exchengesHelper';

function* fetchExchanges({ payload }) {
  const { isMore, limit } = payload;
  const state = yield select();
  const { result: data, hasMore } = yield call(apiGetExchanges, {
    userId: state.currentUser.uid,
    limit,
    startAfter: state.exchanges.startAfter,
  });

  const { exchangesByDays, exchangesObj } = convertExchanges(data);

  const startAfter = hasMore ? data[data.length - 1].createdAt : 0;

  saveToStorage(exchangesObj, isMore);

  if (isMore) {
    yield put(setMoreExchanges({ data: exchangesByDays, hasMore, startAfter }));
  } else {
    yield put(setExchanges({ data: exchangesByDays, hasMore, startAfter }));
  }
}

function* addNewExchange({ payload }) {
  const state = yield select();

  const { fromCurrency, fromValue, toValue, toCurrency } = payload;

  yield call(apiChangesInExchange, { info: payload, userId: state.currentUser.uid });

  yield put(setCurrencyStatsChangesByExchanges({ fromCurrency, fromValue, toValue, toCurrency }));

  yield put(setSuccessSaved(true));
}

function* removeExchange({ payload: id }) {
  const state = yield select();

  const exchanges = JSON.parse(localStorage.getItem('exchanges'));

  const { from, to } = exchanges[id];
  const info = {
    fromCurrency: from.currency.id,
    toCurrency: to.currency.id,
    fromValue: from.amount,
    toValue: to.amount,
  };

  yield call(apiChangesInExchange, {
    id,
    userId: state.currentUser.uid,
    info,
    isRemove: true,
  });

  yield put(setCurrencyStatsChangesByExchanges({ ...info, isRemove: true }));

  yield put(removeCurrentExchange(id));
}

export default function* watchExchangesSaga() {
  yield takeLatest(fetchExchangesAction, fetchExchanges);
  yield takeLeading(addNewExchangeAction, addNewExchange);
  yield takeLeading(removeExchangeAction, removeExchange);
}
