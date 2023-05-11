import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topThree: [],
  topHundred: [],
  newCoins: []
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setTopThree(state, action) {
      state.topThree = action.payload;
    },
    setTopHundred(state, action) {
      state.topHundred = action.payload;
    },
    setNewCoins(state, action) {
      state.newCoins = action.payload;
    }
  }
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;