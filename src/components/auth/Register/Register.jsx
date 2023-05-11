import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import { validateUsername } from '../../../utils/usernameValidation';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './Register.module.css';
import { onRegister } from '../../../store/auth-actions';
import Card from '../../UI/Card/Card';

const Register = () => {
  const dispatch = useDispatch();
  const { formValues, isFormValid, changeHandler, blurHandler, doPasswordMatch, resetValues } = useForm({
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
      dispatch(onRegister(formValues));
    }
    resetValues();
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
        />
        <Input
          label='Username'
          id='username'
          onChange={changeHandler}
          onBlur={usernameBlurHandler}
          value={formValues.username}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          onChange={changeHandler}
          onBlur={passwordBlurHandler}
          value={formValues.password}
        />
        <Input
          label='Repeat Password'
          id='rePass'
          type='password'
          onChange={changeHandler}
          onBlur={rePassBlurHandler}
          value={formValues.rePass}
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