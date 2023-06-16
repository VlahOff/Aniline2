import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { authActions } from '../../../store/auth';
import { onAccountDeletion } from '../../../store/auth-actions';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Modal from '../../UI/modal/Modal';
import PasswordErrorMessage from '../../UI/passwordErrorMessage/PasswordErrorMessage';

import classes from './DeleteAccountModal.module.css';

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formValues, isFormValid, changeHandler } = useForm({
    password: '',
    passwordValid: null,
  });

  const onCloseModalHandler = () => {
    dispatch(authActions.toggleDeleteAccountModal());
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(onAccountDeletion(formValues.password, navigate));
    }
  };

  return (
    <Modal onClose={onCloseModalHandler} className={classes.modal}>
      <form onSubmit={onFormSubmitHandler}>
        <h1 className={classes.title}>Delete Account</h1>
        <Input
          label={'Password'}
          id={'password'}
          value={formValues.password}
          onChange={(e) => changeHandler(e, validatePassword)}
          error={formValues.passwordValid}
          errorMessage={<PasswordErrorMessage />}
          type={'password'}
        />
        <div className={classes['btn-container']}>
          <Button
            onClick={onCloseModalHandler}
            className={classes['cancel-btn']}
          >
            Cancel
          </Button>
          <Button type={'submit'} disabled={!isFormValid}>
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteAccountModal;
