'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import Input from '@/components/input/Input';
import PasswordErrorMessage from '@/components/passwordErrorMessage/PasswordErrorMessage';
import { useForm } from '@/hooks/useForm';
import { onLogin } from '@/redux/actions/authActions';
import { validateEmail } from '@/utils/emailValidation';
import { validatePassword } from '@/utils/passwordValidation';
import ForgotPassword from './ForgotPassword';

import styles from './page.module.css';

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	
	const { formValues, isFormValid, changeHandler } = useForm({
		email: '',
		emailValid: null,
		password: '',
		passwordValid: null,
	});

	const [selectedPassReset, setSelectedPassReset] = useState(false);

	const onFormSubmitHandler = event => {
		event.preventDefault();
		isFormValid && dispatch(onLogin(formValues, router));
	};

	const toggleSelectedPassReset = () => {
		setSelectedPassReset(s => !s);
	};

	return (
		<Card className={styles.card}>
			{!selectedPassReset ? (
				<>
					<h1 className={styles.title}>Login</h1>
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
							label="Password"
							id="password"
							type="password"
							onChange={e => changeHandler(e, validatePassword)}
							value={formValues.password}
							error={formValues.passwordValid}
							errorMessage={<PasswordErrorMessage />}
						/>
						<Button
							className={styles.btn}
							disabled={!isFormValid}
							type="submit"
						>
							Login
						</Button>
					</form>
					<button
						onClick={toggleSelectedPassReset}
						className={styles['pass-reset-btn']}
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
