import { useForm } from '../../../hooks/useForm';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import { validateUsername } from '../../../utils/usernameValidation';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './Register.module.css';

const Register = () => {
  const { values, isFormValid, changeHandler, blurHandler, doPasswordMatch } = useForm({
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

  return (
    <>
      <h1>Register</h1>
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
          label='Username'
          id='username'
          onChange={changeHandler}
          onBlur={usernameBlurHandler}
          value={values.username}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          onChange={changeHandler}
          onBlur={passwordBlurHandler}
          value={values.password}
        />
        <Input
          label='Repeat Password'
          id='rePass'
          type='password'
          onChange={changeHandler}
          onBlur={rePassBlurHandler}
          value={values.rePass}
        />
        <Button
          disabled={!isFormValid}
        >Register</Button>
      </form>
    </>
  );
};

export default Register;