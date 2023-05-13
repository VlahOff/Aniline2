import * as cryptoService from '../services/cryptoService';
import { cryptoActions } from './crypto';
import { uiActions } from './ui';

export const getTopThree = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    cryptoService.fetchTopThree()
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(cryptoActions.setTopThree(res));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const getTopHundred = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    cryptoService.fetchTopHundred()
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(cryptoActions.setTopHundred(res));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const getNewCoins = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    cryptoService.fetchNewCoins()
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(cryptoActions.setNewCoins(res));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const getGlobalData = () => {
  return (dispatch) => {
    cryptoService.fetchGlobalData()
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(cryptoActions.setGlobalData(res));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};