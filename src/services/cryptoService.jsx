import { fetchApi } from '../utils/fetchApi';

const BASE_URL = 'http://localhost:3232/crypto';

export const fetchTopThree = () => {
  return fetchApi.get(`${BASE_URL}/topThree`);
};

export const fetchTopHundred = () => {
  return fetchApi.get(`${BASE_URL}/topHundred`);
};

export const fetchNewCoins = () => {
  return fetchApi.get(`${BASE_URL}/newCoins`);
};

export const fetchGlobalData = () => {
  return fetchApi.get(`${BASE_URL}/getGlobalData`);
};