import * as cryptoService from '../services/cryptoService';
import { cryptoActions } from './crypto';
import { NotificationTypes, uiActions } from './ui';

export const getTopThree = () => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		cryptoService
			.fetchTopThree()
			.then(res => {
				if (res.errorMessage) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.errorMessage,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.setTopThree(res));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getTopHundred = page => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		Promise.all([
			cryptoService.fetchGlobalData(),
			cryptoService.fetchTopHundred(page),
		])
			.then(res => {
				if (res[0].message || res[1].message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res[0].message || res[1].message,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.setGlobalData(res[0]));
				dispatch(cryptoActions.setTopHundred(res[1]));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getNextPageOnTopHundred = page => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		cryptoService
			.fetchTopHundred(page)
			.then(res => {
				if (res.errorMessage) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.errorMessage,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.appendTopHundred(res));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getNewCoins = () => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		Promise.all([
			cryptoService.fetchGlobalData(),
			cryptoService.fetchNewCoins(),
		])
			.then(res => {
				if (res[0].message || res[1].message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res[0].message || res[1].message,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.setGlobalData(res[0]));
				dispatch(cryptoActions.setNewCoins(res[1]));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getNextPageOnNewCoins = page => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		cryptoService
			.fetchNewCoins(page)
			.then(res => {
				if (res.errorMessage) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.errorMessage,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.appendNewCoins(res));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getCoinDetails = (id, days) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		Promise.all([
			cryptoService.fetchCoinDetails(id),
			cryptoService.fetchCoinOHLC(id, days),
		])
			.then(res => {
				if (res[0].message || res[1].message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res[0].message || res[1].message,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.setCoinDetails(res[0]));
				dispatch(cryptoActions.setCoinDetailsOHLC(res[1].coinOHLC));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};

export const getSearchResults = query => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		cryptoService
			.fetchSearchResults(query)
			.then(res => {
				if (res.errorMessage) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.errorMessage,
							type: NotificationTypes.Error,
						})
					);
					return;
				}

				dispatch(cryptoActions.setSearchResults(res));
			})
			.catch(err =>
				dispatch(
					uiActions.setNotificationMessage({
						message: err,
						type: NotificationTypes.Error,
					})
				)
			)
			.finally(() => dispatch(uiActions.stopLoading()));
	};
};
