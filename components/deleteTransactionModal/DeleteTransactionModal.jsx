'use client';

import { useDispatch } from 'react-redux';

import { deleteTransaction } from '@/redux/actions/portfolioActions';
import Button from '../button/Button';

import styles from './DeleteTransactionModal.module.css';

const DeleteTransactionModal = ({ setStartedDeletion, transactionId }) => {
	const dispatch = useDispatch();

	const onConfirmedDeletion = () => {
		dispatch(deleteTransaction(transactionId));
	};

	const cancelDeletion = () => {
		setStartedDeletion(false);
	};

	return (
		<>
			<h1 className={styles.title}>
				Are you sure you want to delete this transaction?
			</h1>
			<div className={styles['btn-wrapper']}>
				<Button
					className={styles['confirm-btn']}
					onClick={onConfirmedDeletion}
				>
					Yes
				</Button>
				<Button
					className={styles['cancel-btn']}
					onClick={cancelDeletion}
				>
					No
				</Button>
			</div>
		</>
	);
};

export default DeleteTransactionModal;
