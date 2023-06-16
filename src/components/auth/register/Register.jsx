import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { onRegister } from '../../../store/auth-actions';
import { validateEmail } from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';
import { validateUsername } from '../../../utils/usernameValidation';
import Button from '../../UI/button/Button';
import Card from '../../UI/card/Card';
import Input from '../../UI/input/Input';
import PasswordErrorMessage from '../../UI/passwordErrorMessage/PasswordErrorMessage';

import classes from './Register.module.css';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { formValues, isFormValid, changeHandler, doPasswordMatch } = useForm({
		email: '',
		emailValid: null,
		username: '',
		usernameValid: null,
		password: '',
		passwordValid: null,
		rePass: '',
		rePassValid: null,
	});

	const onFormSubmitHandler = event => {
		event.preventDefault();
		isFormValid && dispatch(onRegister(formValues, navigate));
	};

	return (
		<Card className={classes.card}>
			<h1 className={classes.title}>Register</h1>
			<form
				onSubmit={onFormSubmitHandler}
				className={classes.form}
			>
				<Input
					label="Email"
					id="email"
					type="email"
					onChange={e => changeHandler(e, validateEmail)}
					value={formValues.email}
					error={formValues.emailValid}
					errorMessage={'Invalid e-mail.'}
				/>
				<Input
					label="Username"
					id="username"
					onChange={e => changeHandler(e, validateUsername)}
					value={formValues.username}
					error={formValues.usernameValid}
					errorMessage={'Username must be between 3 and 30 characters long.'}
				/>
				<Input
					label="Password"
					id="password"
					type="password"
					onChange={e => changeHandler(e, validatePassword)}
					value={formValues.password}
					error={formValues.passwordValid}
					errorMessage={<PasswordErrorMessage />}
				/>
				<Input
					label="Repeat Password"
					id="rePass"
					type="password"
					onChange={e => changeHandler(e, doPasswordMatch)}
					value={formValues.rePass}
					error={formValues.rePassValid}
					errorMessage={'Passwords don`t match.'}
				/>
				<Button
					className={classes.btn}
					disabled={!isFormValid}
					type="submit"
				>
					Register
				</Button>
			</form>
		</Card>
	);
};

export default Register;
