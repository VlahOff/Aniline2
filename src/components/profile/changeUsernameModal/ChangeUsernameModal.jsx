import { useDispatch } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { authActions } from '../../../store/auth';
import { onUsernameChange } from '../../../store/auth-actions';
import { validatePassword } from '../../../utils/passwordValidation';
import { validateUsername } from '../../../utils/usernameValidation';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Modal from '../../UI/modal/Modal';
import PasswordErrorMessage from '../../UI/passwordErrorMessage/PasswordErrorMessage';

import classes from './ChangeUsernameModal.module.css';

const ChangeUsernameModal = () => {
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler } = useForm({
    newUsername: '',
    newUsernameValid: null,
    password: '',
    passwordValid: null
  });

  const usernameBlurHandler = (event) => {
    blurHandler(event, validateUsername);
  };

  const passwordBlurHandler = (event) => {
    blurHandler(event, validatePassword);
  };

  const onCloseModalHandler = () => {
    dispatch(authActions.toggleChangeUsernameModal());
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(onUsernameChange(formValues));
    }
  };

  return (
    <Modal onClose={onCloseModalHandler} className={classes.modal}>
      <form onSubmit={onFormSubmitHandler}>
        <h1 className={classes.title} >Change Username</h1>
        <div className={classes['input-container']}>
          <Input
            label={'New Username'}
            id={'newUsername'}
            value={formValues.newUsername}
            onChange={changeHandler}
            onBlur={usernameBlurHandler}
            error={formValues.newUsernameValid}
            errorMessage={'Username must be between 3 and 30 characters long.'}
          />
          <Input
            label={'Password'}
            id={'password'}
            value={formValues.password}
            onChange={changeHandler}
            onBlur={passwordBlurHandler}
            error={formValues.passwordValid}
            errorMessage={<PasswordErrorMessage />}
            type={'password'}
          />
        </div>
        <div className={classes['btn-container']}>
          <Button
            onClick={onCloseModalHandler}
            className={classes['cancel-btn']}
          >Cancel</Button>
          <Button
            type={'submit'}
            disabled={!isFormValid}
          >Change Username</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeUsernameModal;