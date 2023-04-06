import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  isLoading: false,
};

export const registrationReducer = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    signUpAction: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    signUpError: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
    setSignUpSuccess: (state) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUpAction, signUpError, setSignUpSuccess } = registrationReducer.actions;

export default registrationReducer.reducer;
