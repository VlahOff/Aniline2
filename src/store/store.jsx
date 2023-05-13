import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import cryptoSlice from './crypto';
import uiSlice from './ui';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    crypto: cryptoSlice.reducer
  }
});