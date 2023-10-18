import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../redux/ui';

import styles from './Notification.module.css';

const Notification = () => {
	const dispatch = useDispatch();
	const { notificationMessage, isNotificationShown, notificationType } =
		useSelector(state => state.ui);

	useEffect(() => {
		setTimeout(() => {
			dispatch(uiActions.hideNotification());
		}, 6000);
	}, [isNotificationShown]);

	return (
		<>
			<div
				className={`${styles.banner} ${styles[notificationType]} ${
					isNotificationShown ? styles.show : styles.close
				}`}
			>
				<p className={styles.message}>{notificationMessage}</p>
			</div>
		</>
	);
};

export default Notification;
