import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export const fetchTopThree = async () => {
	const res = await axios.get('http://localhost:3000/api/crypto/topThree', {
		headers: { 'Content-Type': 'application/json' },
	});

	return res.data.data;
};

export const fetchTopHundred = async (page = 1) => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/topHundred?page=${page}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchNewCoins = async (page = 1) => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/newCoins?page=${page}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchGlobalData = async () => {
	const res = await axios.get(
		'http://localhost:3000/api/crypto/getGlobalData',
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchCryptoMap = async () => {
	const res = await axios.get('http://localhost:3000/api/crypto/cryptoMap', {
		headers: { 'Content-Type': 'application/json' },
	});

	return res.data.data;
};

export const fetchFiatMap = async () => {
	const res = await axios.get('http://localhost:3000/api/crypto/fiatMap', {
		headers: { 'Content-Type': 'application/json' },
	});

	return res.data.data;
};

export const convertCurrency = async (amount, from, to) => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/convertCurrency?amount=${amount}&from=${from}&to=${to}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchCoinDetails = async id => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/getCoinDetails?coinId=${id}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchCoinOHLC = async (id, days = 1) => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/getCoinOHLC?coinId=${id}&days=${days}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};

export const fetchSearchResults = async query => {
	const res = await axios.get(
		`http://localhost:3000/api/crypto/search?query=${query}`,
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

	return res.data.data;
};
