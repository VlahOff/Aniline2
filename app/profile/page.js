'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import ChangePasswordModal from '@/components/changePasswordModal/ChangePasswordModal';
import ChangeUsernameModal from '@/components/changeUsernameModal/ChangeUsernameModal';
import DeleteAccountModal from '@/components/deleteAccountModal/DeleteAccountModal';
import { authActions } from '@/redux/slices/authSlice';

import profileIcon from '../../public/profile-icon.jpg';
import styles from './page.module.css';

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
			<section className={styles.wrapper}>
				<Card className={styles.card}>
					<Image
						src={profileIcon}
						alt="user profile image"
						className={styles['user-img']}
						quality={100}
					/>
					<p className={styles.username}>{user?.username}</p>
					<p className={styles.email}>{user?.email}</p>
					<div className={styles['actions-wrapper']}>
						<Button onClick={onOpenChangeUsernameModal}>Change username</Button>
						<Button onClick={onOpenChangePasswordModal}>Change password</Button>
						<Button onClick={onOpenDeleteAccountModal}>Delete account</Button>
					</div>
				</Card>
			</section>
		</>
	);
};

export default Profile;
