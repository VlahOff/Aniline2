import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import { useForm } from '../../../hooks/useForm';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';

const Login = () => {
  const { values, isFormValid, changeHandler, blurHandler } = useForm({
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

  return (
    <>
      <h1>Login</h1>
      <form>
        <Input
          label='Email'
          id='email'
          type='email'
          onChange={changeHandler}
          onBlur={emailBlurHandler}
          value={values.email}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          onChange={changeHandler}
          onBlur={passwordBlurHandler}
          value={values.password}
        />
        <Button>Login</Button>
      </form>
    </>
  );
};

export default Login;