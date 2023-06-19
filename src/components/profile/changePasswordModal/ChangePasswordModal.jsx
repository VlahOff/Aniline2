import { useDispatch } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { authActions } from '../../../store/auth';
import { onPasswordChange } from '../../../store/auth-actions';
import { validatePassword } from '../../../utils/passwordValidation';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Modal from '../../UI/modal/Modal';
import PasswordErrorMessage from '../../shared/passwordErrorMessage/PasswordErrorMessage';

import classes from './ChangePasswordModal.module.css';

const ChangePasswordModal = () => {
	const dispatch = useDispatch();
	const { formValues, isFormValid, changeHandler, doPasswordMatch } = useForm({
		oldPassword: '',
		oldPasswordValid: null,
		newPassword: '',
		newPasswordValid: null,
		newPasswordRepeat: '',
		newPasswordRepeatValid: null,
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
						id={'newPassword'}
						value={formValues.newPassword}
						onChange={e => changeHandler(e, validatePassword)}
						error={formValues.newPasswordValid}
						errorMessage={<PasswordErrorMessage />}
						type={'password'}
					/>
					<Input
						label={'Repeat new password'}
						id={'newPasswordRepeat'}
						value={formValues.newPasswordRepeat}
						onChange={e => changeHandler(e, doPasswordMatch)}
						error={formValues.newPasswordRepeatValid}
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
