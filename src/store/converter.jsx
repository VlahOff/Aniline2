import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cryptoMap: [],
	cryptoMapResult: [],
	fiatMap: [],
	fiatMapResult: [],
	fromCryptoToFiat: true,
	selectedFromInput: '',
	selectedToInput: '',
	toObject: null,
	result: null,
};

const converterSlice = createSlice({
	name: 'converter',
	initialState,
	reducers: {
		setCryptoData(state, action) {
			state.cryptoMap = action.payload;
		},
		setFiatData(state, action) {
			state.fiatMap = action.payload;
		},
		setCryptoDataResult(state, action) {
			state.cryptoMapResult = action.payload;
		},
		setFiatDataResult(state, action) {
			state.fiatMapResult = action.payload;
		},
		setSelectedFromInput(state, action) {
			state.selectedFromInput = action.payload;
		},
		setSelectedToInput(state, action) {
			state.selectedToInput = action.payload;
		},
		clearCryptoResults(state) {
			state.cryptoMapResult = [];
		},
		clearFiatResults(state) {
			state.fiatMapResult = [];
		},
		setConvertResult(state, action) {
			state.result = action.payload;
		},
		setToObjectResult(state, action) {
			state.toObject = action.payload;
		},
		toggleFromCryptoToFiat(state) {
			state.fromCryptoToFiat = !state.fromCryptoToFiat;
			state.selectedFromInput = '';
			state.selectedToInput = '';
		},
	},
});

export const converterActions = converterSlice.actions;

export default converterSlice;
