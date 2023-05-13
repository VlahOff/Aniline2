import * as authService from '../services/authService';
import { authActions } from './auth';
import { uiActions } from './ui';

export const onRegister = (formData, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService.register({
      email: formData.email,
      username: formData.username,
      password: formData.password
    })
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(authActions.setUser(res));
        localStorage.setItem('userData', JSON.stringify(res));
        navigate('/');
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const onLogin = (formData, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService.login({
      email: formData.email,
      password: formData.password
    })
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(authActions.setUser(res));
        localStorage.setItem('userData', JSON.stringify(res));
        navigate('/');
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const onLogout = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService.logout()
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(authActions.setUser(null));
        localStorage.removeItem('userData');
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
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