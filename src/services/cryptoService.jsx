import { fetchApi } from '../utils/fetchApi';

const BASE_URL = import.meta.env.VITE_CRYPTO_BACKEND;

export const fetchTopThree = async () => {
  return fetchApi.get(`${BASE_URL}/topThree`);
};

export const fetchTopHundred = async () => {
  return fetchApi.get(`${BASE_URL}/topHundred`);
};

export const fetchNewCoins = async () => {
  return fetchApi.get(`${BASE_URL}/newCoins`);
};

export const fetchGlobalData = async () => {
  return fetchApi.get(`${BASE_URL}/getGlobalData`);
};

export const fetchCryptoMap = async () => {
  return fetchApi.get(`${BASE_URL}/cryptoMap`);
};

export const fetchFiatMap = async () => {
  return fetchApi.get(`${BASE_URL}/fiatMap`);
};

export const convertCurrency = async (amount, from, to) => {
  return fetchApi.get(`${BASE_URL}/convert?amount=${amount}&from=${from}&to=${to}`);
};