import { createSlice } from '@reduxjs/toolkit';

const initialState = { expend: null, income: null, successSaved: false };

export const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */

    /*  Fetch cases. From saga */
    setCategories: (state, { payload }) => {
      return { ...state, ...payload };
    },

    /* Add data from forms cases. To saga */
    updateNewCategoriesAction: () => {},

    /* Add data from forms cases. From saga */
    updateCategories: (state, { payload }) => {
      return { ...state, ...payload, successSaved: true };
    },

    /* Set, reset cases */
    resetSuccess: (state) => {
      state.successSaved = false;
    },
  },
});

export const { updateNewCategoriesAction, setCategories, updateCategories, resetSuccess } = categoriesReducer.actions;

export default categoriesReducer.reducer;
