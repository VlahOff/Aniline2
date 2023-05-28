import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onRegister } from '../../../store/auth-actions';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import { validateUsername } from '../../../utils/usernameValidation';
import PasswordErrorMessage from '../../UI/passwordErrorMessage/PasswordErrorMessage';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';

import classes from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler, doPasswordMatch } = useForm({
    email: '',
    emailValid: null,
    username: '',
    usernameValid: null,
    password: '',
    passwordValid: null,
    rePass: '',
    rePassValid: null
  });

  const emailBlurHandler = (event) => {
    blurHandler(event, validateEmail);
  };

  const usernameBlurHandler = (event) => {
    blurHandler(event, validateUsername);
  };

  const passwordBlurHandler = (event) => {
    blurHandler(event, validatePassword);
  };

  const rePassBlurHandler = (event) => {
    doPasswordMatch(event);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(onRegister(formValues, navigate));
    }
  };

  return (
    <Card className={classes.card}>
      <h1 className={classes.title}>Register</h1>
      <form onSubmit={onFormSubmitHandler} className={classes.form}>
        <Input
          label='Email'
          id='email'
          type='email'
          onChange={changeHandler}
          onBlur={emailBlurHandler}
          value={formValues.email}
          error={formValues.emailValid}
          errorMessage={'Invalid e-mail.'}
        />
        <Input
          label='Username'
          id='username'
          onChange={changeHandler}
          onBlur={usernameBlurHandler}
          value={formValues.username}
          error={formValues.usernameValid}
          errorMessage={'Username must be between 3 and 30 characters long.'}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          onChange={changeHandler}
          onBlur={passwordBlurHandler}
          value={formValues.password}
          error={formValues.passwordValid}
          errorMessage={<PasswordErrorMessage />}
        />
        <Input
          label='Repeat Password'
          id='rePass'
          type='password'
          onChange={changeHandler}
          onBlur={rePassBlurHandler}
          value={formValues.rePass}
          error={formValues.rePassValid}
          errorMessage={'Passwords don`t match.'}
        />
        <Button
          className={classes.btn}
          disabled={!isFormValid}
          type='submit'
        >Register</Button>
      </form>
    </Card>
  );
};

export default Register;