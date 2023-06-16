import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { converterActions } from '../../store/converter';
import {
  filterCryptoData,
  filterFiatData,
  getConvertResult,
  getCurrencyMaps,
} from '../../store/converter-actions';
import { priceParser } from '../../utils/priceParser';
import Button from '../UI/button/Button';
import Card from '../UI/card/Card';
import Input from '../UI/input/Input';
import InputWithDropdown from '../UI/inputWithDropdown/InputWithDropdown';

import classes from './CryptoConverter.module.css';

const isAmountValid = (value) => {
  return Number(value) > 0;
};

const CryptoConverter = () => {
  const dispatch = useDispatch();
  const {
    cryptoMapResult,
    fiatMapResult,
    result,
    fromCryptoToFiat,
    toObject,
    selectedToInput,
  } = useSelector((state) => state.converter);

  const { formValues, isFormValid, changeHandler, setValues, resetValues } =
    useForm({
      fromValue: '',
      fromValueValid: null,
      toValue: '',
      toValueValid: null,
      amount: '',
      amountValid: null,
    });

  useEffect(() => {
    dispatch(getCurrencyMaps());
  }, []);

  const onInputFromHandler = (event) => {
    changeHandler(event, (v) => v.trim().length > 0);

    fromCryptoToFiat
      ? dispatch(filterCryptoData(formValues.fromValue))
      : dispatch(filterFiatData(formValues.fromValue));
  };

  const onBlurFromHandler = () => {
    setTimeout(() => {
      fromCryptoToFiat
        ? dispatch(converterActions.clearCryptoResults())
        : dispatch(converterActions.clearFiatResults());
    }, 500);
  };

  const onInputToHandler = (event) => {
    changeHandler(event, (v) => v.trim().length > 0);

    fromCryptoToFiat
      ? dispatch(filterFiatData(formValues.toValue))
      : dispatch(filterCryptoData(formValues.toValue));
  };

  const onBlurToHandler = () => {
    setTimeout(() => {
      !fromCryptoToFiat
        ? dispatch(converterActions.clearCryptoResults())
        : dispatch(converterActions.clearFiatResults());
    }, 500);
  };

  const onConvertSubmitHandler = (event) => {
    event.preventDefault();
    isFormValid && dispatch(getConvertResult(formValues.amount));
  };

  const selectFrom = (item) => {
    setValues((s) => ({ ...s, fromValue: item.name }));
    dispatch(converterActions.setSelectedFromInput(item.id));

    fromCryptoToFiat
      ? dispatch(converterActions.clearCryptoResults())
      : dispatch(converterActions.clearFiatResults());
  };

  const selectTo = (item) => {
    setValues((s) => ({ ...s, toValue: item.name }));
    dispatch(converterActions.setSelectedToInput(item.id));

    fromCryptoToFiat
      ? dispatch(converterActions.clearFiatResults())
      : dispatch(converterActions.clearCryptoResults());
  };

  const toggleFromTo = () => {
    dispatch(converterActions.toggleFromCryptoToFiat());
    dispatch(converterActions.setConvertResult(null));
    resetValues();
  };

  return (
    <Card className={classes.converter}>
      <form onSubmit={onConvertSubmitHandler}>
        <h1 className={classes.title}>Cryptocurrency Converter</h1>
        <div className={classes['inputs-wrapper']}>
          <InputWithDropdown
            label={`From ${fromCryptoToFiat ? 'Crypto' : 'Fiat'}`}
            id="fromValue"
            onChange={onInputFromHandler}
            onBlur={onBlurFromHandler}
            value={formValues.fromValue}
            error={formValues.fromValueValid}
            errorMessage={'Please select a currency.'}
            isDropdownShown={fromCryptoToFiat ? cryptoMapResult : fiatMapResult}
          >
            {(fromCryptoToFiat ? cryptoMapResult : fiatMapResult).map(
              (item) => {
                return (
                  <p
                    className={classes.item}
                    key={item.id}
                    onClick={() => selectFrom(item)}
                  >
                    {item.name} - {item.symbol}
                  </p>
                );
              }
            )}
          </InputWithDropdown>
          <Button onClick={toggleFromTo}>
            <i className="fa-solid fa-repeat"></i>
          </Button>
          <InputWithDropdown
            label={`To ${!fromCryptoToFiat ? 'Crypto' : 'Fiat'}`}
            id="toValue"
            onChange={onInputToHandler}
            onBlur={onBlurToHandler}
            value={formValues.toValue}
            error={formValues.toValueValid}
            errorMessage={'Please select a currency.'}
            isDropdownShown={fromCryptoToFiat ? fiatMapResult : cryptoMapResult}
          >
            {(fromCryptoToFiat ? fiatMapResult : cryptoMapResult).map(
              (item) => {
                return (
                  <p
                    className={classes.item}
                    key={item.id}
                    onClick={() => selectTo(item)}
                  >
                    {item.name} - {item.symbol}
                  </p>
                );
              }
            )}
          </InputWithDropdown>
        </div>
        <Input
          label={'Amount'}
          id={'amount'}
          type={'number'}
          onChange={(e) => changeHandler(e, isAmountValid)}
          value={formValues.amount}
          error={formValues.amountValid}
          errorMessage={'Please provide a value greater than 0.'}
        />
        <Button
          type="submit"
          disabled={!isFormValid}
          className={classes['submit-btn']}
        >
          Convert
        </Button>
      </form>
      {result && (
        <p className={classes.result}>
          {result?.amount} {result?.name} ({result?.symbol}) ={' '}
          {priceParser(result?.quote[selectedToInput]?.price)} {toObject?.name}{' '}
          ({toObject?.symbol})
        </p>
      )}
      <p className={classes['powered-by']}>Powered by CoinMarketCap</p>
    </Card>
  );
};

export default CryptoConverter;
