import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { converterActions } from '../../store/converter';
import { filterCryptoData, filterFiatData, getConvertResult, getCurrencyMaps } from '../../store/converter-actions';
import { priceParser } from '../../utils/priceParser';
import Button from '../UI/button/Button';
import Card from '../UI/card/Card';
import Input from '../UI/input/Input';
import InputWithDropdown from '../UI/inputWithDropdown/InputWithDropdown';

import classes from './CryptoConverter.module.css';

const CryptoConverter = () => {
  const dispatch = useDispatch();
  const {
    cryptoMapResult,
    fiatMapResult,
    result,
    fromCryptoToFiat,
    toObject,
    selectedToInput
  } = useSelector(state => state.converter);

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(getCurrencyMaps());
  }, []);

  const onInputFromHandler = (event) => {
    setFromValue(event.target.value);
    if (fromCryptoToFiat) {
      dispatch(filterCryptoData(fromValue));
      return;
    }
    dispatch(filterFiatData(fromValue));
  };

  const onInputToHandler = (event) => {
    setToValue(event.target.value);
    if (!fromCryptoToFiat) {
      dispatch(filterCryptoData(toValue));
      return;
    }
    dispatch(filterFiatData(toValue));
  };

  const onAmountInputHandler = (event) => {
    setAmount(event.target.value);
  };

  const onConvertSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(getConvertResult(amount));
  };

  const selectFrom = (item) => {
    setFromValue(item.name);
    dispatch(converterActions.setSelectedFromInput(item.id));

    if (fromCryptoToFiat) {
      dispatch(converterActions.clearCryptoResults());
      return;
    }
    dispatch(converterActions.clearFiatResults());
  };

  const selectTo = (item) => {
    setToValue(item.name);
    dispatch(converterActions.setSelectedToInput(item.id));

    if (!fromCryptoToFiat) {
      dispatch(converterActions.clearCryptoResults());
      return;
    }
    dispatch(converterActions.clearFiatResults());
  };

  const toggleFromTo = () => {
    dispatch(converterActions.toggleFromCryptoToFiat());
    dispatch(converterActions.setConvertResult(null));
    setFromValue('');
    setToValue('');
    setAmount('');
  };

  return (
    <Card className={classes.converter}>
      <form onSubmit={onConvertSubmitHandler}>
        <h1 className={classes.title}>Cryptocurrency Converter</h1>
        <div className={classes['inputs-wrapper']}>
          <InputWithDropdown
            label='From'
            id='from'
            onChange={onInputFromHandler}
            value={fromValue}
            isDropdownShown={fromCryptoToFiat ? cryptoMapResult : fiatMapResult}
          >
            {(fromCryptoToFiat ? cryptoMapResult : fiatMapResult)
              .map(item => {
                return <p
                  className={classes.item}
                  key={item.id}
                  onClick={() => selectFrom(item)}
                >
                  {item.name} - {item.symbol}
                </p>;
              })
            }
          </InputWithDropdown>
          <Button onClick={toggleFromTo}><i className="fa-solid fa-repeat"></i></Button>
          <InputWithDropdown
            label='To'
            id='to'
            onChange={onInputToHandler}
            value={toValue}
            isDropdownShown={fromCryptoToFiat ? fiatMapResult : cryptoMapResult}
          >
            {(fromCryptoToFiat ? fiatMapResult : cryptoMapResult)
              .map(item => {
                return <p
                  className={classes.item}
                  key={item.id}
                  onClick={() => selectTo(item)}
                >
                  {item.name} - {item.symbol}
                </p>;
              })
            }
          </InputWithDropdown>
        </div>
        <Input
          label={'Amount'}
          id={amount}
          type={'number'}
          onChange={onAmountInputHandler}
          value={amount}
        />
        <Button type='submit' className={classes['submit-btn']}>Convert</Button>
      </form>
      {result &&
        <p className={classes.result}>
          {result?.amount} {result?.name} ({result?.symbol}) = {priceParser(result?.quote[selectedToInput]?.price)} {toObject?.name} ({toObject?.symbol})
        </p>
      }
    </Card>
  );
};

export default CryptoConverter;