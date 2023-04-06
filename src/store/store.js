import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

// eslint-disable-next-line import/no-named-as-default
import categories from 'REDUX/categories';
import currencies from 'REDUX/currencies';
import currentUser from 'REDUX/currentUser';
import exchanges from 'REDUX/exchanges';
import login from 'REDUX/login';
import monthCategoryStats from 'REDUX/monthCategoryStats';
import registration from 'REDUX/registration';
import selectedCurrency from 'REDUX/selectedCurrency';
import totalCategoryStats from 'REDUX/totalCategoryStats';
import transactions from 'REDUX/transactions';
import watchCategoriesSaga from 'SAGA/categories';
import watchCurrenciesSaga from 'SAGA/currencies';
import watchCurrentUserSaga from 'SAGA/currentUser';
import watchExchangesSaga from 'SAGA/exchanges';
import watchLoginSaga from 'SAGA/login';
import watchMonthCategoryStatsSaga from 'SAGA/monthCategoryStats';
import watchRegistrationSaga from 'SAGA/registration';
import watchSelectedCurrencySaga from 'SAGA/selectedCurrency';
import watchTotalStatsSaga from 'SAGA/totalCategoryStats';
import watchTransactionsSaga from 'SAGA/transactions';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const staticReducers = {
  categories,
  currencies,
  currentUser,
  exchanges,
  login,
  monthCategoryStats,
  registration,
  selectedCurrency,
  totalCategoryStats,
  transactions,
};

const store = configureStore({
  reducer: staticReducers,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
});

store.asyncReducers = {};

store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(combineReducers({ ...staticReducers, ...store.asyncReducers }));
};

function createSagaInjector(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    if (isInjected(key)) return;
    const task = runSaga(saga);
    injectedSagas.set(key, task);
  };

  injectSaga('root', rootSaga);

  return injectSaga;
}

function* rootSaga() {
  yield all([
    fork(watchSelectedCurrencySaga),
    fork(watchCategoriesSaga),
    fork(watchCurrenciesSaga),
    fork(watchTransactionsSaga),
    fork(watchMonthCategoryStatsSaga),
    fork(watchLoginSaga),
    fork(watchRegistrationSaga),
    fork(watchCurrentUserSaga),
    fork(watchExchangesSaga),
    fork(watchTotalStatsSaga),
  ]);
}

store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

export default store;
