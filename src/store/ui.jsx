import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;