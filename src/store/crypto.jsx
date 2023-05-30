import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topThree: [],
  topHundred: [],
  newCoins: [],
  globalData: {},
  coinDetails: {},
  coinDetailsOHLC: []
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
    },
    setGlobalData(state, action) {
      state.globalData = action.payload;
    },
    setCoinDetails(state, action) {
      state.coinDetails = action.payload;
    },
    setCoinDetailsOHLC(state, action) {
      state.coinDetailsOHLC = action.payload;
    }
  }
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;