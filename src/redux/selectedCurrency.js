import { createSlice } from '@reduxjs/toolkit';

const initialState = { currency: null };

export const selectedCurrencyReducer = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */

    /* Fetch cases. From saga */
    setSelectedCurrency: (state, { payload }) => {
      state.currency = payload;
    },

    /* Add data from forms cases. To saga */
    changeSelectedCurrencyAction: () => {},
  },
});

export const { changeSelectedCurrencyAction, setSelectedCurrency } = selectedCurrencyReducer.actions;

export default selectedCurrencyReducer.reducer;
