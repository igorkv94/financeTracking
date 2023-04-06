import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const totalCategoryStatsReducer = createSlice({
  name: 'totalCategoryStats',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    fetchTotalStatsAction: () => {},

    /*  Fetch cases. From saga */
    setTotalStats: (state, { payload }) => {
      return payload;
    },

    /* Add data from forms cases. To saga */

    /* Add data from forms cases. From saga */
    updateTotalStats: (state, { payload }) => {
      const { id, amount } = payload;
      if (state) {
        const index = state.findIndex((item) => item.category.id === id);
        state[index].amount -= amount;
      }
    },

    /* Set, reset cases */
    resetTotalStats: () => {
      return initialState;
    },
  },
});

export const { fetchTotalStatsAction, setTotalStats, updateTotalStats, resetTotalStats } =
  totalCategoryStatsReducer.actions;

export default totalCategoryStatsReducer.reducer;
