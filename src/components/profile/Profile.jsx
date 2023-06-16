import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../store/auth';
import Button from '../UI/button/Button';
import Card from '../UI/card/Card';
import ChangePasswordModal from './changePasswordModal/ChangePasswordModal';
import ChangeUsernameModal from './changeUsernameModal/ChangeUsernameModal';
import DeleteAccountModal from './deleteAccountModal/DeleteAccountModal';

import profileIcon from '../../assets/profile-icon.jpg';
import classes from './Profile.module.css';

const Profile = () => {
	const {
		user,
		isChangeUsernameModalOpen,
		isChangePasswordModalOpen,
		isDeleteAccountModalOpen,
	} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const onOpenChangeUsernameModal = () => {
		dispatch(authActions.toggleChangeUsernameModal());
	};

	const onOpenChangePasswordModal = () => {
		dispatch(authActions.toggleChangePasswordModal());
	};

	const onOpenDeleteAccountModal = () => {
		dispatch(authActions.toggleDeleteAccountModal());
	};

	return (
		<>
			{isChangeUsernameModalOpen && <ChangeUsernameModal />}
			{isChangePasswordModalOpen && <ChangePasswordModal />}
			{isDeleteAccountModalOpen && <DeleteAccountModal />}
			<Card className={classes.card}>
				<img
					src={profileIcon}
					alt="user profile image"
					className={classes['user-img']}
				/>
				<p className={classes.username}>{user?.username}</p>
				<p className={classes.email}>{user?.email}</p>
				<div className={classes['actions-wrapper']}>
					<Button onClick={onOpenChangeUsernameModal}>Change username</Button>
					<Button onClick={onOpenChangePasswordModal}>Change password</Button>
					<Button onClick={onOpenDeleteAccountModal}>Delete account</Button>
				</div>
			</Card>
		</>
	);
};

export default Profile;
