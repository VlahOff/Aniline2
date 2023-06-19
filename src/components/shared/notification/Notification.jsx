import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../../store/ui';

import classes from './Notification.module.css';

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
				className={`${classes.banner} ${classes[notificationType]} ${
					isNotificationShown ? classes.show : classes.close
				}`}
			>
				<p className={classes.message}>{notificationMessage}</p>
			</div>
		</>
	);
};

export default Notification;
