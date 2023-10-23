'use client';

import { useDispatch } from 'react-redux';

import { useForm } from '@/hooks/useForm';
import { onAccountDeletion } from '@/redux/actions/authActions';
import { authActions } from '@/redux/slices/authSlice';
import { validatePassword } from '@/utils/passwordValidation';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import PasswordErrorMessage from '../passwordErrorMessage/PasswordErrorMessage';

import styles from './DeleteAccountModal.module.css';

const DeleteAccountModal = () => {
	const dispatch = useDispatch();

	const { formValues, isFormValid, changeHandler } = useForm({
		password: '',
		passwordValid: null,
	});

	const onCloseModalHandler = () => {
		dispatch(authActions.toggleDeleteAccountModal());
	};

	const onFormSubmitHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onAccountDeletion(formValues.password));
		}
	};

	return (
		<Modal
			onClose={onCloseModalHandler}
			className={styles.modal}
		>
			<form onSubmit={onFormSubmitHandler}>
				<h1 className={styles.title}>Delete Account</h1>
				<Input
					label={'Password'}
					id={'password'}
					value={formValues.password}
					onChange={e => changeHandler(e, validatePassword)}
					error={formValues.passwordValid}
					errorMessage={<PasswordErrorMessage />}
					type={'password'}
				/>
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
						Delete
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default DeleteAccountModal;
