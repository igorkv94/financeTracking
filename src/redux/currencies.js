import { createSlice } from '@reduxjs/toolkit';

import { currencyDefaultStats, currencyInfo } from 'CONSTS/currencyInfo';

const initialState = { list: [], stats: null, isLoadingStats: true, successSaved: false };

export const currenciesReducer = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    fetchCurrencyStatsAction: (state) => {
      state.isLoadingStats = true;
    },

    /*  Set cases. From saga */
    updateCurrenciesList: (state, { payload }) => {
      state.list = payload.map((item) => ({ id: item, ...currencyInfo[item] }));
    },
    setCurrencyStats: (state, { payload }) => {
      state.isLoadingStats = false;
      state.stats = payload;
    },
    setCurrencyStatsChangesByTransactions: (state, { payload }) => {
      const { amount, isIncome, currency, isRemove } = payload;
      const coef = isRemove ? -1 : 1;
      const coefByCategory = isIncome ? 1 : -1;

      const newCurrenciesStat = state.stats?.[currency];

      if (Object.keys(newCurrenciesStat || {}).length) {
        newCurrenciesStat.current = (newCurrenciesStat.current || 0) + amount * coef * coefByCategory;

        const prop = isIncome ? 'income' : 'expend';
        newCurrenciesStat[prop] = (newCurrenciesStat[prop] || 0) + amount * coef;
      }

      state.isLoadingStats = false;
    },
    setCurrencyStatsChangesByExchanges: (state, { payload }) => {
      const { fromCurrency, fromValue, toValue, toCurrency, isRemove } = payload;
      const coef = isRemove ? -1 : 1;

      const newCurrenciesFromStats = state.stats?.[fromCurrency];
      const newCurrenciesToStats = state.stats?.[toCurrency];

      if (Object.keys(newCurrenciesFromStats || {}).length) {
        newCurrenciesFromStats.exchangedOut = (newCurrenciesFromStats.exchangedOut || 0) + fromValue * coef;
        newCurrenciesFromStats.current = (newCurrenciesFromStats.current || 0) - fromValue * coef;

        newCurrenciesToStats.exchangedIn = (newCurrenciesToStats.exchangedIn || 0) + toValue * coef;
        newCurrenciesToStats.current = (newCurrenciesToStats.current || 0) + toValue * coef;
      }

      state.isLoadingStats = false;
    },
    updateCurrentCurrencyStats: (state, { payload }) => {
      Object.entries(state.stats || {}).forEach(([key, value]) => {
        value.current = payload[key];
      });
      state.successSaved = true;
    },

    /* Add data from forms cases. To saga */
    addNewCurrencyAction: () => {},
    updateCurrencyStatsAction: () => {},

    /*  Add data from forms cases. From saga */
    setNewCurrency: (state, { payload }) => {
      const { currency, amount } = payload;
      state.list.push(currencyInfo[currency]);

      if (!state.stats) {
        state.stats = {};
      }
      state.stats[currency] = {
        ...currencyDefaultStats,
        current: amount,
      };
      state.successSaved = true;
    },

    /* Set, reset cases */
    resetSuccess: (state) => {
      state.successSaved = false;
    },
  },
});

export const {
  fetchCurrencyStatsAction,
  setCurrencyStats,
  setCurrencyStatsChangesByTransactions,
  setCurrencyStatsChangesByExchanges,
  updateCurrenciesList,
  updateCurrentCurrencyStats,
  addNewCurrencyAction,
  updateCurrencyStatsAction,
  setNewCurrency,
  resetSuccess,
} = currenciesReducer.actions;

export default currenciesReducer.reducer;
