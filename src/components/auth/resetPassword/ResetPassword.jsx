import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onPasswordReset } from '../../../store/auth-actions';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';
import PasswordErrorMessage from '../../UI/passwordErrorMessage/PasswordErrorMessage';

import classes from './ResetPassword.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { formValues, isFormValid, changeHandler, doPasswordMatch } = useForm({
    password: '',
    passwordValid: null,
    rePass: '',
    rePassValid: null,
  });

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
          onChange={(e) => changeHandler(e, validatePassword)}
          value={formValues.password}
          error={formValues.passwordValid}
          errorMessage={<PasswordErrorMessage />}
        />
        <Input
          label="Repeat Password"
          id="rePass"
          type="password"
          onChange={(e) => changeHandler(e, doPasswordMatch)}
          value={formValues.rePass}
          error={formValues.rePassValid}
          errorMessage={'Passwords don`t match.'}
        />
        <Button className={classes.btn} disabled={!isFormValid} type={'submit'}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default ResetPassword;
