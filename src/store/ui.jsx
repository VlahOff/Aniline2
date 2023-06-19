import { createSlice } from '@reduxjs/toolkit';
import { errorParser } from '../utils/errorParser';

export const NotificationTypes = {
	Normal: 'normal',
	Error: 'error',
};

const initialState = {
	theme: 'light',
	notificationMessage: '',
	notificationType: '',
	isNotificationShown: false,
	isLoading: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload;
		},
		setNotificationMessage(state, action) {
			state.notificationMessage = errorParser(action.payload.message);
			state.isNotificationShown = true;
			state.notificationType = action.payload.type;
		},
		hideNotification(state) {
			state.notificationMessage = '';
			state.isNotificationShown = false;
			state.notificationType = '';
		},
		startLoading(state) {
			state.isLoading = true;
		},
		stopLoading(state) {
			state.isLoading = false;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
