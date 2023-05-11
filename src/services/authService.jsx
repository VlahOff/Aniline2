import { fetchApi } from '../utils/fetchApi';

const BASE_URL = 'http://localhost:3131/auth';

export const register = (data) => {
  return fetchApi.post(`${BASE_URL}/register`, data);
};

export const login = (data) => {
  return fetchApi.post(`${BASE_URL}/login`, data);
};

export const logout = () => {
  return fetchApi.get(`${BASE_URL}/logout`);
};