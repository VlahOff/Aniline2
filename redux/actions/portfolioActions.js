import { debounce } from 'lodash';
import { store } from '../store';
import { portfolioActions } from '../slices/portfolioSlice';

const worker = new Worker('worker.js');

const filterAllCoins = debounce((input, map) => {
	worker.postMessage({ input, map, message: 'portfolio' });
}, 600);

export const initializePortfolioState = () => {
	// return dispatch => {
	// 	dispatch(uiActions.startLoading());
	// 	Promise.all([
	// 		portfolioService.fetchAllCoinsList(),
	// 		portfolioService.fetchUserTransactions(),
	// 	])
	// 		.then(res => {
	// 			if (res[0].message || res[1].message) {
	// 				dispatch(
	// 					uiActions.setNotificationMessage({
	// 						message: res[0].message || res[1].message,
	// 						type: NotificationTypes.Error,
	// 					})
	// 				);
	// 				return;
	// 			}

	// 			dispatch(portfolioActions.setAllCoinsList(res[0]));
	// 			dispatch(portfolioActions.setTransactions(res[1]));
	// 			dispatch(portfolioActions.calculateTransactionsValue());
	// 		})
	// 		.catch(err =>
	// 			dispatch(
	// 				uiActions.setNotificationMessage({
	// 					message: err,
	// 					type: NotificationTypes.Error,
	// 				})
	// 			)
	// 		)
	// 		.finally(() => dispatch(uiActions.stopLoading()));
	// };
};

export const filterAllCoinsList = input => {
	// return dispatch => {
	// 	const allCoinsList = store.getState().portfolio.allCoinsList;
	// 	filterAllCoins(input, allCoinsList);
	// };
};

worker.onmessage = event => {
	store.dispatch(portfolioActions.setFilteredAllCoinList(event.data));
};

export const submitTransaction = formData => {
	// return dispatch => {
	// 	const transaction = {
	// 		coinId: formData.coinId,
	// 		coinPrice: formData.coinPrice,
	// 		quantity: formData.quantity,
	// 	};

	// 	dispatch(uiActions.startLoading());
	// 	portfolioService
	// 		.addUserTransaction(transaction)
	// 		.then(res => {
	// 			if (res.errorMessage) {
	// 				dispatch(
	// 					uiActions.setNotificationMessage({
	// 						message: res.errorMessage,
	// 						type: NotificationTypes.Error,
	// 					})
	// 				);
	// 				return;
	// 			}

	// 			dispatch(portfolioActions.setTransactions(res));
	// 			dispatch(portfolioActions.calculateTransactionsValue());
	// 			dispatch(portfolioActions.toggleAddModal());
	// 		})
	// 		.catch(err =>
	// 			dispatch(
	// 				uiActions.setNotificationMessage({
	// 					message: err,
	// 					type: NotificationTypes.Error,
	// 				})
	// 			)
	// 		)
	// 		.finally(() => dispatch(uiActions.stopLoading()));
	// };
};

export const submitEditedTransaction = (formData, transactionId) => {
	// return dispatch => {
	// 	const transaction = {
	// 		coinId: formData.coinId,
	// 		coinPrice: formData.coinPrice,
	// 		quantity: formData.quantity,
	// 	};

	// 	dispatch(uiActions.startLoading());
	// 	portfolioService
	// 		.editUserTransaction(transaction, transactionId)
	// 		.then(res => {
	// 			if (res.errorMessage) {
	// 				dispatch(
	// 					uiActions.setNotificationMessage({
	// 						message: res.errorMessage,
	// 						type: NotificationTypes.Error,
	// 					})
	// 				);
	// 				return;
	// 			}

	// 			dispatch(portfolioActions.setTransactions(res));
	// 			dispatch(portfolioActions.calculateTransactionsValue());
	// 			dispatch(portfolioActions.toggleEditModal());
	// 		})
	// 		.catch(err =>
	// 			dispatch(
	// 				uiActions.setNotificationMessage({
	// 					message: err,
	// 					type: NotificationTypes.Error,
	// 				})
	// 			)
	// 		)
	// 		.finally(() => dispatch(uiActions.stopLoading()));
	// };
};

export const deleteTransaction = transactionId => {
	// return dispatch => {
	// 	dispatch(uiActions.startLoading());
	// 	portfolioService
	// 		.deleteUserTransaction(transactionId)
	// 		.then(res => {
	// 			if (res.errorMessage) {
	// 				dispatch(
	// 					uiActions.setNotificationMessage({
	// 						message: res.errorMessage,
	// 						type: NotificationTypes.Error,
	// 					})
	// 				);
	// 				return;
	// 			}

	// 			dispatch(portfolioActions.removeTransaction(transactionId));
	// 			dispatch(portfolioActions.calculateTransactionsValue());
	// 			dispatch(portfolioActions.toggleEditModal());
	// 		})
	// 		.catch(err =>
	// 			dispatch(
	// 				uiActions.setNotificationMessage({
	// 					message: err,
	// 					type: NotificationTypes.Error,
	// 				})
	// 			)
	// 		)
	// 		.finally(() => dispatch(uiActions.stopLoading()));
	// };
};
