'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import Input from '@/components/input/Input';
import PasswordErrorMessage from '@/components/passwordErrorMessage/PasswordErrorMessage';
import { useForm } from '@/hooks/useForm';
import { onRegister } from '@/redux/actions/authActions';
import { validateEmail } from '@/utils/emailValidation';
import { validatePassword } from '@/utils/passwordValidation';
import { validateUsername } from '@/utils/usernameValidation';

import styles from './page.module.css';

const Register = () => {
	const router = useRouter();
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
		isFormValid && dispatch(onRegister(formValues, router));
	};

	return (
		<section className={styles.wrapper}>
			<Card className={styles.card}>
				<h1 className={styles.title}>Register</h1>
				<form
					onSubmit={onFormSubmitHandler}
					className={styles.form}
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
						className={styles.btn}
						disabled={!isFormValid}
						type="submit"
					>
						Register
					</Button>
				</form>
			</Card>
		</section>
	);
};

export default Register;
