import axios from 'axios';

const AUTH_END_POINT = process.env.NEXT_PUBLIC_AUTH_END_POINT;

export const register = async data => {
	const res = await axios.post(`${AUTH_END_POINT}/register`, data, {
		headers: { 'Content-Type': 'application/json' },
	});

	return res.data;
};

export const login = async data => {
	const res = await axios.post(`${AUTH_END_POINT}/login`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return res.data;
};

export const logout = async () => {
	const userData = JSON.parse(localStorage.getItem('userData'));

	const res = await axios.get(`${AUTH_END_POINT}/logout`, {
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': userData.accessToken,
		},
	});

	return res.data;
};

// export const changeUsername = async (newUsername, password) => {
// 	return fetchApi.post(`${AUTH_END_POINT}/changeUsername`, {
// 		newUsername,
// 		password,
// 	});
// };

// export const changePassword = async (oldPassword, newPassword) => {
// 	return fetchApi.post(`${AUTH_END_POINT}/changePassword`, {
// 		oldPassword,
// 		newPassword,
// 	});
// };

// export const deleteAccount = async password => {
// 	return fetchApi.post(`${AUTH_END_POINT}/deleteAccount`, { password });
// };

// export const forgotPassword = async email => {
// 	return fetchApi.post(`${AUTH_END_POINT}/forgotPassword`, { email });
// };

// export const resetPassword = async (password, userId) => {
// 	return fetchApi.post(`${AUTH_END_POINT}/resetPassword`, { password, userId });
// };
