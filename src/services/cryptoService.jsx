import { fetchApi } from '../utils/fetchApi';

const BASE_URL = 'http://localhost:3232/crypto';

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