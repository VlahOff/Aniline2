import { fetchApi } from '../utils/fetchApi';

const BASE_CRYPTO_URL = import.meta.env.VITE_CRYPTO_BACKEND;
const BASE_PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_BACKEND;

export const fetchAllCoinsList = async () => {
  return fetchApi.get(`${BASE_CRYPTO_URL}/allCoins`);
};

export const fetchUserTransactions = async () => {
  return fetchApi.get(`${BASE_PORTFOLIO_URL}/getTransactions`);
};

export const addUserTransaction = async (transaction) => {
  return fetchApi.post(`${BASE_PORTFOLIO_URL}/addTransaction`, { transaction });
};

export const editUserTransaction = async (transaction, transactionId) => {
  return fetchApi.put(`${BASE_PORTFOLIO_URL}/editTransaction`, { transaction, transactionId });
};

export const deleteUserTransaction = async (transactionId) => {
  return fetchApi.delete(`${BASE_PORTFOLIO_URL}/removeTransaction?transactionId=${transactionId}`);
};