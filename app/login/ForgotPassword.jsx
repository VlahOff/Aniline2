'use client';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks/useForm';

import styles from './page.module.css';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import { validateEmail } from '@/utils/emailValidation';

const ForgotPassword = () => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const { formValues, isFormValid, changeHandler } = useForm({
		email: '',
		emailValid: null,
	});

	const formSubmitHandler = event => {
		event.preventDefault();
		// isFormValid && dispatch(onForgotPassword(formValues.email, navigate));
	};

	return (
		<>
			<h1 className={styles.title}>Reset password</h1>
			<form
				className={styles.form}
				onSubmit={formSubmitHandler}
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
				<Button
					className={styles.btn}
					disabled={!isFormValid}
					type={'submit'}
				>
					Reset
				</Button>
			</form>
		</>
	);
};

export default ForgotPassword;
