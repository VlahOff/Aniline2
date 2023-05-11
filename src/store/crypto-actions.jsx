import * as cryptoService from '../services/cryptoService';
import { cryptoActions } from './crypto';

export const getTopThree = () => {
  return async (dispatch) => {
    const response = await cryptoService.fetchTopThree();
    if (response.message) {
      console.log(response);
      return;
    }

    dispatch(cryptoActions.setTopThree(response));
  };
};

export const getTopHundred = () => {
  return async (dispatch) => {
    const response = await cryptoService.fetchTopHundred();
    if (response.message) {
      console.log(response);
      return;
    }

    dispatch(cryptoActions.setTopHundred(response));
  };
};

export const getNewCoins = () => {
  return async (dispatch) => {
    const response = await cryptoService.fetchNewCoins();
    if (response.message) {
      console.log(response);
      return;
    }

    dispatch(cryptoActions.setNewCoins(response));
  };
};