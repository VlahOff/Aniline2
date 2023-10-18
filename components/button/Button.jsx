import styles from './Button.module.css';

const Button = ({ className, id, type, onClick, disabled, children }) => {
	return (
		<button
			className={`${className} ${styles.btn}`}
			id={id}
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
