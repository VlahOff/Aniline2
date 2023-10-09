import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import cryptoSlice from './slices/cryptoSlice';

export const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
		crypto: cryptoSlice.reducer,
	},
});