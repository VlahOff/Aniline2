import { debounce } from 'lodash';
import * as cryptoService from '../services/cryptoService';
import { converterActions } from './converter';
import { store } from './store';
import { uiActions } from './ui';

const worker = new Worker('worker.js');

const filterMap = debounce((input, map) => {
  worker.postMessage({ input, map, message: 'converter' });
}, 600);

export const getCurrencyMaps = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    Promise.all([
      cryptoService.fetchCryptoMap(),
      cryptoService.fetchFiatMap()
    ])
      .then(res => {
        if (res[0].message || res[1].message) {
          dispatch(uiActions.setErrorMessage(res[0].message || res[1].message));
          return;
        }

        dispatch(converterActions.setCryptoData(res[0]));
        dispatch(converterActions.setFiatData(res[1]));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const filterCryptoData = (input) => {
  return (dispatch) => {
    const cryptoMap = store.getState().converter.cryptoMap;
    filterMap(input, cryptoMap);
  };
};

worker.onmessage = (event) => {
  store.dispatch(converterActions.setCryptoDataResult(event.data));
};

export const filterFiatData = (input) => {
  return (dispatch) => {
    const fiatMap = store.getState().converter.fiatMap;
    const result = fiatMap
      .filter(r => {
        return r.name.toLowerCase().includes(input.toLowerCase())
          || r.symbol.toLowerCase().includes(input.toLowerCase());
      });

    dispatch(converterActions.setFiatDataResult(result));
  };
};

export const getConvertResult = (amount) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    dispatch(findToCurrency());
    const { selectedFromInput: selectedFrom, selectedToInput: selectedTo } = store.getState().converter;
    cryptoService.convertCurrency(amount, selectedFrom, selectedTo)
      .then(res => {
        if (res.message) {
          dispatch(uiActions.setErrorMessage(res.message));
          return;
        }

        dispatch(converterActions.setConvertResult(res));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err));
      })
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

const findToCurrency = () => {
  return (dispatch) => {
    const { fromCryptoToFiat, selectedToInput: selectedTo, cryptoMap, fiatMap } = store.getState().converter;
    let res;
    if (fromCryptoToFiat) {
      res = fiatMap.filter(i => selectedTo == i.id);
    } else {
      res = cryptoMap.filter(i => selectedTo == i.id);
    }

    dispatch(converterActions.setToObjectResult(res[0]));
  };
};