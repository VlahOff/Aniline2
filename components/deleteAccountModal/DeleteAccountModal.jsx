import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import PasswordErrorMessage from '../../components/passwordErrorMessage/PasswordErrorMessage';
import { useForm } from '../../hooks/useForm';
import { authActions } from '../../redux/auth';
import { onAccountDeletion } from '../../redux/auth-actions';
import { validatePassword } from '../../utils/passwordValidation';

import styles from './DeleteAccountModal.module.css';

const DeleteAccountModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
			dispatch(onAccountDeletion(formValues.password, navigate));
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
