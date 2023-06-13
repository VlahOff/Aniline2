import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onForgotPassword } from '../../../store/auth-actions';
import { validateEmail } from '../../../utils/emailValidation';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';

import classes from './Login.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formValues, isFormValid, changeHandler, blurHandler } = useForm({
    email: '',
    emailValid: null,
  });

  const emailBlurHandler = (event) => {
    blurHandler(event, validateEmail);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    isFormValid && dispatch(onForgotPassword(formValues.email, navigate));
  };

  return (
    <>
      <h1 className={classes.title}>Reset password</h1>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <Input
          label="Email"
          id="email"
          type="email"
          onChange={changeHandler}
          onBlur={emailBlurHandler}
          value={formValues.email}
          error={formValues.emailValid}
          errorMessage={'Invalid e-mail.'}
        />
        <Button className={classes.btn} disabled={!isFormValid} type={'submit'}>
          Reset
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
