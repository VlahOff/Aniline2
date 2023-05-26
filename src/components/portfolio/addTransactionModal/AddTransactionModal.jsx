import { useDispatch } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { portfolioActions } from '../../../store/portfolio';
import { filterAllCoinsList, submitTransaction } from '../../../store/portfolio-actions';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import InputWithDropdown from '../../UI/inputWithDropdown/InputWithDropdown';
import Modal from '../../UI/modal/Modal';

import classes from './AddTransactionModal.module.css';

const AddTransactionModal = ({
  allCoinsList
}) => {
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler, setValues } = useForm({
    coinName: '',
    coinId: '',
    coinIdValid: null,
    coinPrice: '',
    coinPriceValid: null,
    quantity: '',
    quantityValid: null,
  });

  const onCoinSelectHandler = (coin) => {
    setValues(state => ({
      ...state,
      coinName: coin.name,
      coinId: coin.id
    }));
    dispatch(portfolioActions.clearFilteredAllCoins());
  };
  
  const onCoinInputHandler = (event) => {
    setValues(state => ({
      ...state,
      coinName: event.target.value
    }));
    dispatch(filterAllCoinsList(event.target.value));
  };
  
  const onCoinBlurHandler = (event) => {
    blurHandler(event, () => event.target.value.trim().length > 0);
  };
  
  const onNumberInputBlurHandler = (event) => {
    blurHandler(event, () => event.target.value > 0);
  };
  
  const onCloseHandler = () => {
    dispatch(portfolioActions.toggleAddModal());
    dispatch(portfolioActions.clearFilteredAllCoins());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(submitTransaction(formValues));
    }
  };

  return (
    <Modal onClose={onCloseHandler}>
      <form onSubmit={onSubmitHandler}>
        <h1 className={classes.title}>Add Transaction</h1>
        <div className={classes['input-container']}>
          <InputWithDropdown
            label={'Coin'}
            id={'coinId'}
            value={formValues.coinName}
            error={formValues.coinIdValid}
            errorMessage={'Enter a coin name.'}
            onChange={onCoinInputHandler}
            onBlur={onCoinBlurHandler}
            isDropdownShown={true}
          >
            {allCoinsList && allCoinsList.map(c => {
              return <p
                key={c.id}
                className={classes.item}
                onClick={() => onCoinSelectHandler(c)}
              >
                {c.name}
              </p>;
            })}
          </InputWithDropdown>
          <Input
            label={'Price per coin'}
            id={'coinPrice'}
            value={formValues.coinPrice}
            error={formValues.coinPriceValid}
            errorMessage={'Enter value greater than 0'}
            onChange={changeHandler}
            onBlur={onNumberInputBlurHandler}
            type={'number'}
          />
          <Input
            label={'Quantity'}
            id={'quantity'}
            value={formValues.quantity}
            error={formValues.quantityValid}
            errorMessage={'Enter value greater than 0'}
            onChange={changeHandler}
            onBlur={onNumberInputBlurHandler}
            type={'number'}
          />
          <Input
            label={'Total spent'}
            id={'total'}
            value={formValues.quantity * formValues.coinPrice}
            disabled={true}
          />
        </div>
        <div className={classes['btn-container']}>
          <Button onClick={onCloseHandler}>Cancel</Button>
          <Button type={'submit'}>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;