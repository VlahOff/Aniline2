import { debounce } from 'lodash';
import { converterActions } from '../slices/converterSlice';
import * as cryptoService from '../services/cryptoService';
import { store } from '../store';

const worker = new Worker('worker.js');

const filterMap = debounce((input, map) => {
	worker.postMessage({ input, map, message: 'converter' });
}, 600);

export const getCurrencyMaps = () => {
	return dispatch => {
		// dispatch(uiActions.startLoading());
		Promise.all([
			cryptoService.fetchCryptoMap(),
			cryptoService.fetchFiatMap(),
		]).then(res => {
			// if (res[0].message || res[1].message) {
			// 	dispatch(
			// 		uiActions.setNotificationMessage({
			// 			message: res[0].message || res[1].message,
			// 			type: NotificationTypes.Error,
			// 		})
			// 	);
			// 	return;
			// }

			dispatch(converterActions.setCryptoData(res[0]));
			dispatch(converterActions.setFiatData(res[1]));
		});
		// .catch(err =>
		// 	dispatch(
		// 		uiActions.setNotificationMessage({
		// 			message: err,
		// 			type: NotificationTypes.Error,
		// 		})
		// 	)
		// )
		// .finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const filterCryptoData = input => {
	return dispatch => {
		const cryptoMap = store.getState().converter.cryptoMap;
		filterMap(input, cryptoMap);
	};
};

worker.onmessage = event => {
	store.dispatch(converterActions.setCryptoDataResult(event.data));
};

export const filterFiatData = input => {
	return dispatch => {
		const fiatMap = store.getState().converter.fiatMap;
		const result = fiatMap.filter(r => {
			return (
				r.name.toLowerCase().includes(input.toLowerCase()) ||
				r.symbol.toLowerCase().includes(input.toLowerCase())
			);
		});

		dispatch(converterActions.setFiatDataResult(result));
	};
};

export const getConvertResult = amount => {
	return dispatch => {
		// dispatch(uiActions.startLoading());
		dispatch(findToCurrencyResultObject());
		const { selectedFromInput, selectedToInput } = store.getState().converter;

		cryptoService
			.convertCurrency(amount, selectedFromInput, selectedToInput)
			.then(res => {
				// if (res.errorMessage) {
				// 	dispatch(
				// 		uiActions.setNotificationMessage({
				// 			message: res.errorMessage,
				// 			type: NotificationTypes.Error,
				// 		})
				// 	);
				// 	return;
				// }

				dispatch(converterActions.setConvertResult(res));
			});
		// .catch(err =>
		// 	dispatch(
		// 		uiActions.setNotificationMessage({
		// 			message: err,
		// 			type: NotificationTypes.Error,
		// 		})
		// 	)
		// )
		// .finally(() => dispatch(uiActions.stopLoading()));
	};
};

const findToCurrencyResultObject = () => {
	return dispatch => {
		const {
			fromCryptoToFiat,
			selectedToInput: selectedTo,
			cryptoMap,
			fiatMap,
		} = store.getState().converter;
		let res;
		if (fromCryptoToFiat) {
			res = fiatMap.filter(i => selectedTo == i.id);
		} else {
			res = cryptoMap.filter(i => selectedTo == i.id);
		}

		dispatch(converterActions.setToObjectResult(res[0]));
	};
};
