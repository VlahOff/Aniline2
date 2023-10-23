'use client';

import { useDispatch } from 'react-redux';

import { useForm } from '@/hooks/useForm';
import { onPasswordChange } from '@/redux/actions/authActions';
import { authActions } from '@/redux/slices/authSlice';
import { validatePassword } from '@/utils/passwordValidation';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import PasswordErrorMessage from '../passwordErrorMessage/PasswordErrorMessage';

import styles from './ChangePasswordModal.module.css';

const ChangePasswordModal = () => {
	const dispatch = useDispatch();
	const { formValues, isFormValid, changeHandler, doPasswordMatch } = useForm({
		oldPassword: '',
		oldPasswordValid: null,
		password: '',
		passwordValid: null,
		passwordRepeat: '',
		passwordRepeatValid: null,
	});

	const onCloseModalHandler = () => {
		dispatch(authActions.toggleChangePasswordModal());
	};

	const onFormSubmitHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onPasswordChange(formValues));
		}
	};

	return (
		<Modal
			onClose={onCloseModalHandler}
			className={styles.modal}
		>
			<form onSubmit={onFormSubmitHandler}>
				<h1 className={styles.title}>Change Password</h1>
				<div className={styles['input-container']}>
					<Input
						label={'Old password'}
						id={'oldPassword'}
						value={formValues.oldPassword}
						onChange={e => changeHandler(e, validatePassword)}
						error={formValues.oldPasswordValid}
						errorMessage={<PasswordErrorMessage />}
						type={'password'}
					/>
					<Input
						label={'New password'}
						id="password"
						value={formValues.password}
						onChange={e => changeHandler(e, validatePassword)}
						error={formValues.passwordValid}
						errorMessage={<PasswordErrorMessage />}
						type={'password'}
					/>
					<Input
						label={'Repeat new password'}
						id="passwordRepeat"
						value={formValues.passwordRepeat}
						onChange={e => changeHandler(e, doPasswordMatch)}
						error={formValues.passwordRepeatValid}
						errorMessage={<PasswordErrorMessage />}
						type={'password'}
					/>
				</div>
				<div className={styles['btn-container']}>
					<Button
						onClick={onCloseModalHandler}
						className={styles['cancel-btn']}
					>
						Cancel
					</Button>
					<Button
						type={'submit'}
						disabled={!isFormValid}
					>
						Change password
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ChangePasswordModal;
