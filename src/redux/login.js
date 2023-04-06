import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  isLoading: false,
};

export const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAction: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    logoutAction: (state) => {
      state.error = null;
    },
    setLoginError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    setLoginSuccess: (state) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction, setLoginError, setLoginSuccess } = loginReducer.actions;

export default loginReducer.reducer;
