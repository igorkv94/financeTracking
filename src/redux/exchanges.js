import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  startAfter: 0,
  isLoaderMore: false,
  hasMore: true,
  savedSuccess: false,
  successRemoved: false,
};

export const exchangesReducer = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    fetchExchangesAction: (state, { payload }) => {
      state.isLoaderMore = !!payload.offset;
    },

    /*  Fetch cases. From saga */
    setExchanges: (state, { payload }) => {
      return payload;
    },
    setMoreExchanges: (state, { payload }) => {
      state.data = [...state.data, ...payload.data];
      state.isLoaderMore = false;
      state.hasMore = payload.hasMore;
      state.startAfter = payload.startAfter;
    },

    /* Add data from forms cases. To saga */
    addNewExchangeAction: () => {},
    removeExchangeAction: () => {},

    /* Add data from forms cases. From saga */
    removeCurrentExchange: (state, { payload }) => {
      state.data.some(({ exchanges }, i) => {
        const index = exchanges.findIndex((exchange) => exchange === payload);
        if (index !== -1) {
          exchanges.splice(index, 1);
        }

        if (!exchanges.length) {
          state.data.splice(i, 1);
        }
        return index !== -1;
      });

      state.successRemoved = true;
    },

    /* Set, reset cases */
    setSuccessSaved: (state, { payload }) => {
      state.savedSuccess = payload;
    },
    resetSuccessRemoved: (state) => {
      state.successRemoved = false;
    },
    resetExchanges: () => {
      return initialState;
    },
  },
});

export const {
  fetchExchangesAction,
  addNewExchangeAction,
  removeExchangeAction,
  setExchanges,
  setMoreExchanges,
  removeCurrentExchange,
  setSuccessSaved,
  resetSuccessRemoved,
  resetExchanges,
} = exchangesReducer.actions;

export default exchangesReducer.reducer;
