import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  transactionsCount: 0,
  startAfter: 0,
  isLoadingMore: false,
  hasMore: true,
  savedSuccess: false,
  successRemoved: false,
};

export const transactionsReducer = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    fetchTransactionsAction: () => {},
    fetchMoreTransactionsAction: (state) => {
      state.isLoadingMore = true;
    },

    /*  Fetch cases. From saga */
    setTransactions: (state, { payload }) => {
      state.data = payload.data;
      state.transactionsCount = payload.transactionsCount;
      state.hasMore = payload.hasMore;
      state.startAfter = payload.startAfter;
    },
    setMoreTransactions: (state, { payload }) => {
      const maxKey = Object.keys(payload.data).reduce((maxValue, key) => {
        const numKey = parseInt(key, 10);

        return maxValue < numKey ? numKey : maxValue;
      }, 0);

      const payloadItem = payload.data[maxKey];

      if (state.data[maxKey]) {
        const item = JSON.parse(JSON.stringify(state.data[maxKey]));

        item.expend = [...(item.expend || []), ...(payloadItem.expend || [])];
        item.income = [...(item.income || []), ...(payloadItem.income || [])];
        item.total.expend = (item.total.expend || 0) + (payloadItem.total.expend || 0);
        item.total.income = (item.total.income || 0) + (payloadItem.total.income || 0);
        state.data = { ...state.data, ...payload.data, [maxKey]: item };
      } else {
        state.data = { ...state.data, ...payload.data };
      }

      state.transactionsCount = payload.transactionsCount;
      state.hasMore = payload.hasMore;
      state.isLoadingMore = false;
      state.startAfter = payload.startAfter;
    },

    /* Add data from forms cases. To saga */
    addNewTransactionAction: () => {},
    removeTransactionAction: () => {},

    /* Add data from forms cases. From saga */
    removeCurrentTransaction: (state, { payload }) => {
      const { id, date, amount, isIncome } = payload;

      const prop = isIncome ? 'income' : 'expend';
      state.data[date][prop].splice(state.data[date][prop].indexOf(id), 1);
      state.data[date].total[prop] -= amount;

      state.transactionsCount--;
      state.successRemoved = true;
    },

    /* Set, reset cases */
    setSuccessSaved: (state, { payload }) => {
      state.savedSuccess = payload;
    },
    resetSuccessRemoved: (state) => {
      state.successRemoved = false;
    },
    resetTransactions: () => {
      return initialState;
    },
  },
});

export const {
  fetchTransactionsAction,
  fetchMoreTransactionsAction,
  addNewTransactionAction,
  removeTransactionAction,
  setMoreTransactions,
  setTransactions,
  removeCurrentTransaction,
  setSuccessSaved,
  resetSuccessRemoved,
  resetTransactions,
} = transactionsReducer.actions;

export default transactionsReducer.reducer;
