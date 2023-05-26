import { fetchApi } from '../utils/fetchApi';

const BASE_URL = import.meta.env.VITE_AUTH_BACKEND;

export const register = async (data) => {
  return fetchApi.post(`${BASE_URL}/register`, data);
};

export const login = async (data) => {
  return fetchApi.post(`${BASE_URL}/login`, data);
};

export const logout = async () => {
  return fetchApi.get(`${BASE_URL}/logout`);
};