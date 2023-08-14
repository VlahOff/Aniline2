import { useDispatch } from 'react-redux';

import Button from '../../components/button/Button';
import { deleteTransaction } from '../../store/portfolio-actions';

import classes from './DeleteTransactionModal.module.css';

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
			<h1 className={classes.title}>
				Are you sure you want to delete this transaction?
			</h1>
			<div className={classes['btn-wrapper']}>
				<Button
					className={classes['confirm-btn']}
					onClick={onConfirmedDeletion}
				>
					Yes
				</Button>
				<Button
					className={classes['cancel-btn']}
					onClick={cancelDeletion}
				>
					No
				</Button>
			</div>
		</>
	);
};

export default DeleteTransactionModal;
