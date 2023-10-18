import { useEffect } from 'react';

import styles from './LoadingSpinner.module.css';

const Backdrop = () => {
	return <div className={styles.backdrop}></div>;
};

const Loader = () => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.loader}></span>
		</div>
	);
};

const LoadingSpinner = props => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'unset';
		};
	});

	return (
		<>
			<Backdrop />
			<Loader />
		</>
	);
};

export default LoadingSpinner;
