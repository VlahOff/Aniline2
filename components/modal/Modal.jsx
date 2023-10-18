import { useEffect } from 'react';

import Card from '../card/Card';

import styles from './Modal.module.css';

const Backdrop = ({ onClose }) => {
	return (
		<div
			className={styles.backdrop}
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

	const styles = `${styles.modal} ${className}`;

	return (
		<>
			<Backdrop onClose={onClose} />
			<Card className={styles}>{children}</Card>
		</>
	);
};

export default Modal;