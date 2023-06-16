import { fetchApi } from '../utils/fetchApi';

const BASE_URL = import.meta.env.VITE_AUTH_BACKEND;

export const register = async data => {
	return fetchApi.post(`${BASE_URL}/register`, data);
};

export const login = async data => {
	return fetchApi.post(`${BASE_URL}/login`, data);
};

export const logout = async () => {
	return fetchApi.get(`${BASE_URL}/logout`);
};

export const changeUsername = async (newUsername, password) => {
	return fetchApi.post(`${BASE_URL}/changeUsername`, { newUsername, password });
};

export const changePassword = async (oldPassword, newPassword) => {
	return fetchApi.post(`${BASE_URL}/changePassword`, {
		oldPassword,
		newPassword,
	});
};

export const deleteAccount = async password => {
	return fetchApi.post(`${BASE_URL}/deleteAccount`, { password });
};

export const forgotPassword = async email => {
	return fetchApi.post(`${BASE_URL}/forgotPassword`, { email });
};

export const resetPassword = async (password, userId) => {
	return fetchApi.post(`${BASE_URL}/resetPassword`, { password, userId });
};
