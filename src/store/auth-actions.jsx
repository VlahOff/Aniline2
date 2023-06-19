import * as authService from '../services/authService';
import { authActions } from './auth';
import { NotificationTypes, uiActions } from './ui';

export const onRegister = (formData, navigate) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.register({
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
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

				// dispatch(uiActions.setErrorMessage(res.message));
				dispatch(authActions.setUser(res));
				localStorage.setItem('userData', JSON.stringify(res));
				navigate('/login');
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

export const onLogin = (formData, navigate) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.login({
				email: formData.email,
				password: formData.password,
			})
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

				dispatch(authActions.setUser(res));
				localStorage.setItem('userData', JSON.stringify(res));
				navigate('/');
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

export const onLogout = navigate => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.logout()
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

				if (res.message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.message,
							type: NotificationTypes.Normal,
						})
					);
				}

				dispatch(authActions.setUser(null));
				localStorage.removeItem('userData');
				navigate('/');
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

export const isUserLoggedIn = () => {
	return dispatch => {
		const userData = JSON.parse(localStorage.getItem('userData'));

		if (userData) {
			dispatch(authActions.setUser(userData));
		}
	};
};

export const onUsernameChange = formData => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.changeUsername(formData.newUsername, formData.password)
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

				dispatch(authActions.setUser(res));
				localStorage.setItem('userData', JSON.stringify(res));
				dispatch(authActions.toggleChangeUsernameModal());
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

export const onPasswordChange = formData => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.changePassword(formData.oldPassword, formData.newPassword)
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

				if (res.message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.message,
							type: NotificationTypes.Normal,
						})
					);
				}

				dispatch(authActions.toggleChangePasswordModal());
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

export const onAccountDeletion = (password, navigate) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.deleteAccount(password)
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

				if (res.message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.message,
							type: NotificationTypes.Normal,
						})
					);
				}

				localStorage.removeItem('userData');
				dispatch(authActions.setUser(null));
				dispatch(authActions.toggleDeleteAccountModal());
				navigate('/');
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

export const onForgotPassword = (email, navigate) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.forgotPassword(email)
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

				if (res.message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.message,
							type: NotificationTypes.Normal,
						})
					);
				}

				navigate('/');
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

export const onPasswordReset = (password, userId, navigate) => {
	return dispatch => {
		dispatch(uiActions.startLoading());
		authService
			.resetPassword(password, userId)
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

				if (res.message) {
					dispatch(
						uiActions.setNotificationMessage({
							message: res.message,
							type: NotificationTypes.Normal,
						})
					);
				}

				dispatch(authActions.setUser(res));
				localStorage.setItem('userData', JSON.stringify(res));
				navigate('/');
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
