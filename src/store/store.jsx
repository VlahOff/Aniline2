import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import converterSlice from './converter';
import cryptoSlice from './crypto';
import uiSlice from './ui';
import portfolioSlice from './portfolio';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    crypto: cryptoSlice.reducer,
    converter: converterSlice.reducer,
    portfolio: portfolioSlice.reducer
  }
});