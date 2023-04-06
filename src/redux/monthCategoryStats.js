import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const monthCategoryStatsReducer = createSlice({
  name: 'monthCategoryStats',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    fetchMonthCategoryStatsAction: () => {},

    /*  Fetch cases. From saga */
    setMonthCategoryStats: (state, { payload }) => {
      return payload;
    },

    /* Set, reset cases */
    resetMonthCategoryStats: () => {
      return initialState;
    },
  },
});

export const { fetchMonthCategoryStatsAction, setMonthCategoryStats, resetMonthCategoryStats } =
  monthCategoryStatsReducer.actions;

export default monthCategoryStatsReducer.reducer;
