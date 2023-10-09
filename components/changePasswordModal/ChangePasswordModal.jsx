import { useDispatch } from 'react-redux';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import PasswordErrorMessage from '../../components/passwordErrorMessage/PasswordErrorMessage';
import { useForm } from '../../hooks/useForm';
import { authActions } from '../../redux/auth';
import { onPasswordChange } from '../../redux/auth-actions';
import { validatePassword } from '../../utils/passwordValidation';

import classes from './ChangePasswordModal.module.css';

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
			className={classes.modal}
		>
			<form onSubmit={onFormSubmitHandler}>
				<h1 className={classes.title}>Change Password</h1>
				<div className={classes['input-container']}>
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
				<div className={classes['btn-container']}>
					<Button
						onClick={onCloseModalHandler}
						className={classes['cancel-btn']}
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
