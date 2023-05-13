import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onLogin } from '../../../store/auth-actions';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';

import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler, resetValues } = useForm({
    email: '',
    emailValid: null,
    password: '',
    passwordValid: null
  });

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

  return (
    <Card className={classes.card}>
      <h1 className={classes.title}>Login</h1>
      <form onSubmit={onFormSubmitHandler} className={classes.form}>
        <Input
          label='Email'
          id='email'
          type='email'
          onChange={changeHandler}
          onBlur={emailBlurHandler}
          value={formValues.email}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          onChange={changeHandler}
          onBlur={passwordBlurHandler}
          value={formValues.password}
        />
        <Button
          className={classes.btn}
          disabled={!isFormValid}
          type='submit'
        >Login</Button>
      </form>
    </Card>
  );
};

export default Login;