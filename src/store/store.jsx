import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import converterSlice from './converter';
import cryptoSlice from './crypto';
import portfolioSlice from './portfolio';
import uiSlice from './ui';

const inDevMode = import.meta.env.DEV;

export const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
		crypto: cryptoSlice.reducer,
		converter: converterSlice.reducer,
		portfolio: portfolioSlice.reducer,
	},
	devTools: inDevMode,
});
