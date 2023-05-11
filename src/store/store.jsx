import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import cryptoSlice from './crypto';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crypto: cryptoSlice.reducer
  }
});