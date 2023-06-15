import { createSlice } from '@reduxjs/toolkit';
import { errorParser } from '../utils/errorParser';

const initialState = {
  theme: 'light',
  errorMessage: '',
  isErrorShown: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = errorParser(action.payload);
      state.isErrorShown = true;
    },
    hideErrorNotification(state) {
      state.errorMessage = '';
      state.isErrorShown = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
