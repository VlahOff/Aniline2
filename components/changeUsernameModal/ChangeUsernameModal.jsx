'use client';

import { useDispatch } from 'react-redux';

import { useForm } from '@/hooks/useForm';
import { onUsernameChange } from '@/redux/actions/authActions';
import { authActions } from '@/redux/slices/authSlice';
import { validatePassword } from '@/utils/passwordValidation';
import { validateUsername } from '@/utils/usernameValidation';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import PasswordErrorMessage from '../passwordErrorMessage/PasswordErrorMessage';

import styles from './ChangeUsernameModal.module.css';

const ChangeUsernameModal = () => {
	const dispatch = useDispatch();
	const { formValues, isFormValid, changeHandler } = useForm({
		newUsername: '',
		newUsernameValid: null,
		password: '',
		passwordValid: null,
	});

	const onCloseModalHandler = () => {
		dispatch(authActions.toggleChangeUsernameModal());
	};

	const onFormSubmitHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onUsernameChange(formValues));
		}
	};

	return (
		<Modal
			onClose={onCloseModalHandler}
			className={styles.modal}
		>
			<form onSubmit={onFormSubmitHandler}>
				<h1 className={styles.title}>Change Username</h1>
				<div className={styles['input-container']}>
					<Input
						label={'New Username'}
						id={'newUsername'}
						value={formValues.newUsername}
						onChange={e => changeHandler(e, validateUsername)}
						error={formValues.newUsernameValid}
						errorMessage={'Username must be between 3 and 30 characters long.'}
					/>
					<Input
						label={'Password'}
						id={'password'}
						value={formValues.password}
						onChange={e => changeHandler(e, validatePassword)}
						error={formValues.passwordValid}
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
						Change Username
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ChangeUsernameModal;
