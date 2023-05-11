import * as authService from '../services/authService';
import { authActions } from './auth';

export const onRegister = (formData) => {
  return async (dispatch) => {
    const response = await authService.register({
      email: formData.email,
      username: formData.username,
      password: formData.password
    });

    if (response.message) {
      console.log(response);
      return;
    }

    dispatch(authActions.setUser(response));
    localStorage.setItem('userData', JSON.stringify(response));
  };
};

export const onLogin = (formData) => {
  return async (dispatch) => {
    const response = await authService.login({
      email: formData.email,
      password: formData.password
    });

    console.log(response);
    if (response.message) {
      return;
    }

    dispatch(authActions.setUser(response));
    localStorage.setItem('userData', JSON.stringify(response));
  };
};

export const onLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(authActions.setUser(null));
  };
};

export const isUserLoggedIn = () => {
  return (dispatch) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      dispatch(authActions.setUser(userData));
    }
  };
};