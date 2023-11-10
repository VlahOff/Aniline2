import axios from 'axios';

function createHeaders() {
	const userData = JSON.parse(localStorage.getItem('userData'));
	const headers = { 'Content-Type': 'application/json' };

	if (userData) {
		return { ...headers, userId: userData.userId };
	}

	return headers;
}

export const fetchAllCoinsList = async () => {
	const res = await axios.get('http://localhost:3000/api/crypto/allCoins', {
		headers: createHeaders(),
	});

	return res.data;
};

export const fetchUserTransactions = async () => {
	const res = await axios.get(
		'http://localhost:3000/api/portfolio/getTransactions',
		{
			headers: createHeaders(),
		}
	);

	return res.data;
};

export const addUserTransaction = async transaction => {
	const res = await axios.post(
		'http://localhost:3000/api/portfolio/addTransaction',
		transaction,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data;
};

export const editUserTransaction = async (transaction, transactionId) => {
	const res = await axios.put(
		'http://localhost:3000/api/portfolio/editTransaction',
		{
			transaction,
			transactionId,
		},
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data;
};

export const deleteUserTransaction = async transactionId => {
	const res = await axios.delete(
		`http://localhost:3000/api/portfolio/removeTransaction?transactionId=${transactionId}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data;
};
