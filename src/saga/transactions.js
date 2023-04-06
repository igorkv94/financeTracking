import { takeLatest, takeLeading, put, select, call } from 'redux-saga/effects';

import { apiChangesInTransaction, apiGetTransactions } from 'API/transactions';
import { setCurrencyStatsChangesByTransactions } from 'REDUX/currencies';
import { updateTotalStats } from 'REDUX/totalCategoryStats';
import {
  fetchTransactionsAction,
  fetchMoreTransactionsAction,
  addNewTransactionAction,
  removeTransactionAction,
  setTransactions,
  removeCurrentTransaction,
  setMoreTransactions,
  setSuccessSaved,
} from 'REDUX/transactions';

import { convertTransactions } from './helpers/transactionsHelper';

function* fetchTransactions({ payload }) {
  const { limit } = payload;
  const state = yield select();
  const { result, hasMore } = yield call(apiGetTransactions, {
    userId: state.currentUser.uid,
    currency: state.selectedCurrency.currency,
    limit,
  });

  const { newTransactions, transactionsByDays } = convertTransactions(result);

  localStorage.setItem('transactions', JSON.stringify(newTransactions));
  yield put(
    setTransactions({
      data: transactionsByDays,
      transactionsCount: Object.keys(newTransactions).length,
      hasMore,
      startAfter: hasMore ? result[result.length - 1].createdAt : 0,
    }),
  );
}

function* fetchMoreTransactions({ payload }) {
  const { limit } = payload;

  const state = yield select();
  const { result, hasMore } = yield call(apiGetTransactions, {
    userId: state.currentUser.uid,
    currency: state.selectedCurrency.currency,
    limit,
    startAfter: state.transactions.startAfter,
  });

  const { newTransactions, transactionsByDays } = convertTransactions(result);

  const storageTransactions = JSON.parse(localStorage.getItem('transactions'));
  const transactions = { ...storageTransactions, ...newTransactions };

  localStorage.setItem('transactions', JSON.stringify(transactions));
  yield put(
    setMoreTransactions({
      data: transactionsByDays,
      transactionsCount: Object.keys(transactions).length,
      hasMore,
      startAfter: hasMore ? result[result.length - 1].createdAt : 0,
    }),
  );
}

function* addNewTransaction({ payload }) {
  const state = yield select();

  const { currency, amount, isIncome } = payload;

  yield call(apiChangesInTransaction, { userId: state.currentUser.uid, info: payload });

  yield put(setCurrencyStatsChangesByTransactions({ amount, isIncome, currency }));

  yield put(setSuccessSaved(true));
}

function* removeTransaction({ payload }) {
  const state = yield select();
  const transactionsData = JSON.parse(localStorage.getItem('transactions'));

  const { id, date, amount, category } = transactionsData[payload];
  const currency = state.selectedCurrency.currency;

  yield call(apiChangesInTransaction, {
    id: payload,
    userId: state.currentUser.uid,
    info: {
      currency,
      isIncome: category.isIncome,
      category: category.id,
      amount,
    },
    isRemove: true,
  });

  yield put(setCurrencyStatsChangesByTransactions({ amount, isIncome: category.isIncome, currency, isRemove: true }));

  yield put(updateTotalStats({ id: category.id, amount }));

  yield put(removeCurrentTransaction({ id, date, amount, isIncome: category.isIncome }));

  delete transactionsData[id];
  localStorage.setItem('transactions', JSON.stringify(transactionsData));
}

export default function* watchTransactionsSaga() {
  yield takeLatest(fetchTransactionsAction, fetchTransactions);
  yield takeLatest(fetchMoreTransactionsAction, fetchMoreTransactions);
  yield takeLeading(addNewTransactionAction, addNewTransaction);
  yield takeLeading(removeTransactionAction, removeTransaction);
}
