import styles from './Input.module.css';

const Input = ({
	className,
	type,
	id,
	label,
	onChange,
	onBlur,
	value,
	disabled,
	error,
	errorMessage,
}) => {
	return (
		<div className={`${styles['input-wrapper']} ${className}`}>
			<input
				type={type || 'text'}
				name={id}
				id={id}
				placeholder={label}
				className={styles.input}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				disabled={disabled}
				autoComplete="off"
			/>
			<label
				htmlFor={id}
				className={styles.label}
			>
				{label}
			</label>
			{error === false && (
				<div className={styles['error-message']}>{errorMessage}</div>
			)}
		</div>
	);
};

export default Input;
