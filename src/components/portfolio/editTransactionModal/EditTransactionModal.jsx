import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { portfolioActions } from '../../../store/portfolio';
import { deleteTransaction, submitEditedTransaction } from '../../../store/portfolio-actions';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Modal from '../../UI/modal/Modal';

import classes from './EditTransactionModal.module.css';

const EditTransactionModal = () => {
  const dispatch = useDispatch();
  const selectedTransaction = useSelector(state => state.portfolio.selectedTransaction);

  const { formValues, isFormValid, changeHandler, blurHandler } = useForm({
    coinName: selectedTransaction?.name,
    coinId: selectedTransaction?.coinId,
    coinPrice: selectedTransaction?.boughtPrice,
    coinPriceValid: null,
    quantity: selectedTransaction?.quantity,
    quantityValid: null,
  });

  const onNumberInputBlurHandler = (event) => {
    blurHandler(event, () => event.target.value > 0);
  };

  const onCloseHandler = () => {
    dispatch(portfolioActions.toggleEditModal());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(submitEditedTransaction(formValues, selectedTransaction.transactionId));
    }
  };

  const onDeleteTransactionHandler = () => {
    dispatch(deleteTransaction(selectedTransaction.transactionId));
  };

  return (
    <Modal onClose={onCloseHandler} className={classes.modal}>
      <form onSubmit={onSubmitHandler}>
        <h1 className={classes.title}>Edit Transaction</h1>
        <div className={classes['input-container']}>
          <Input
            label={'Coin'}
            id={'coinId'}
            value={formValues.coinName}
            disabled={true}
          />
          <Input
            label={'Price per coin'}
            id={'coinPrice'}
            value={formValues.coinPrice}
            error={formValues.coinPriceValid}
            errorMessage={'Enter value greater than 0'}
            type={'number'}
            onChange={changeHandler}
            onBlur={onNumberInputBlurHandler}
          />
          <Input
            label={'Quantity'}
            id={'quantity'}
            value={formValues.quantity}
            error={formValues.quantityValid}
            errorMessage={'Enter value greater than 0'}
            type={'number'}
            onChange={changeHandler}
            onBlur={onNumberInputBlurHandler}
          />
          <Input
            label={'Total spent'}
            id={'total'}
            value={formValues.quantity * formValues.coinPrice}
            disabled={true}
          />
        </div>
        <div className={classes['btn-container']}>
          <Button
            className={classes['cancel-btn']}
            onClick={onCloseHandler}
          >
            Cancel
          </Button>
          <Button
            className={classes['edit-btn']}
            type={'submit'}
            disabled={!isFormValid}
          >
            Edit
          </Button>
          <Button
            className={classes['delete-btn']}
            onClick={onDeleteTransactionHandler}
          >
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTransactionModal;