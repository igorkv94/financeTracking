import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null,
  email: null,
  creationTime: null,
  loading: true,
};

export const currentUserReducer = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    /*  Fetch cases. To saga */
    initDataAction: () => {},

    /* Set, reset cases */
    setUserLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUser: (state, { payload }) => {
      const { uid, email, creationTime } = payload;
      state.uid = uid;
      state.creationTime = creationTime;
      state.email = email;
    },
    clearUser: () => {
      return { ...initialState, loading: false };
    },
  },
});

export const { initDataAction, setUserLoading, setUser, clearUser } = currentUserReducer.actions;

export default currentUserReducer.reducer;
