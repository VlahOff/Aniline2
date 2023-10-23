import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import converterSlice from './slices/converterSlice';
import cryptoSlice from './slices/cryptoSlice';
import portfolioSlice from './slices/portfolioSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
		crypto: cryptoSlice.reducer,
		converter: converterSlice.reducer,
		portfolio: portfolioSlice.reducer,
	},
});
