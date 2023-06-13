import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onPasswordReset } from '../../../store/auth-actions';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';

import classes from './ResetPassword.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  
  const { formValues, isFormValid, changeHandler, blurHandler } = useForm({
    password: '',
    passwordValid: null,
  });

  const passwordBlurHandler = (event) => {
    blurHandler(event, validatePassword);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    isFormValid &&
      dispatch(onPasswordReset(formValues.password, userId, navigate));
  };

  return (
    <Card className={classes.card}>
      <h1 className={classes.title}>Enter your new password</h1>
      <form onSubmit={formSubmitHandler} className={classes.form}>
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
        <Button className={classes.btn} disabled={!isFormValid} type={'submit'}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default ResetPassword;
