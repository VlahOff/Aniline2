import { useEffect } from 'react';

import Card from '../card/Card';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => {
	return (
		<div
			className={classes.backdrop}
			onClick={onClose}
		></div>
	);
};

const Modal = ({ className, children, onClose }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'unset';
		};
	});

	const styles = `${classes.modal} ${className}`;

	return (
		<>
			<Backdrop onClose={onClose} />
			<Card className={styles}>{children}</Card>
		</>
	);
};

export default Modal;
