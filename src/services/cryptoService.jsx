import { fetchApi } from '../utils/fetchApi';

const BASE_URL = import.meta.env.VITE_CRYPTO_BACKEND;

export const fetchTopThree = async () => {
  return fetchApi.get(`${BASE_URL}/topThree`);
};

export const fetchTopHundred = async (page = 1) => {
  return fetchApi.get(`${BASE_URL}/topHundred?page=${page}`);
};

export const fetchNewCoins = async (page = 1) => {
  return fetchApi.get(`${BASE_URL}/newCoins?page=${page}`);
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

export const fetchCoinDetails = async (id) => {
  return fetchApi.get(`${BASE_URL}/getCoinDetails?coinId=${id}`);
};

export const fetchCoinOHLC = async (id, days) => {
  return fetchApi.get(`${BASE_URL}/getCoinOHLC?id=${id}&days=${days || 1}`);
};