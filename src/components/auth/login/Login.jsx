import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onLogin } from '../../../store/auth-actions';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';
import ForgotPassword from './ForgotPassword';

import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler } = useForm({
    email: '',
    emailValid: null,
    password: '',
    passwordValid: null,
  });

  const [selectedPassReset, setSelectedPassReset] = useState(false);

  const emailBlurHandler = (event) => {
    blurHandler(event, validateEmail);
  };

  const passwordBlurHandler = (event) => {
    blurHandler(event, validatePassword);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(onLogin(formValues, navigate));
    }
  };

  const toggleSelectedPassReset = () => {
    setSelectedPassReset((s) => !s);
  };

  return (
    <Card className={classes.card}>
      {!selectedPassReset ? (
        <>
          <h1 className={classes.title}>Login</h1>
          <form onSubmit={onFormSubmitHandler} className={classes.form}>
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
            <Input
              label="Password"
              id="password"
              type="password"
              onChange={changeHandler}
              onBlur={passwordBlurHandler}
              value={formValues.password}
              error={formValues.passwordValid}
              errorMessage={'Invalid password.'}
            />
            <Button
              className={classes.btn}
              disabled={!isFormValid}
              type="submit"
            >
              Login
            </Button>
          </form>
          <button
            onClick={toggleSelectedPassReset}
            className={classes['pass-reset-btn']}
          >
            Forgot your password?
          </button>
        </>
      ) : (
        <ForgotPassword />
      )}
    </Card>
  );
};

export default Login;
