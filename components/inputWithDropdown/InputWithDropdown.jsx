import styles from './InputWithDropdown.module.css';

const InputWithDropdown = ({
	children,
	className,
	type,
	id,
	label,
	onChange,
	onBlur,
	value,
	error,
	errorMessage,
	isDropdownShown,
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
				autoComplete="off"
			/>
			<label
				htmlFor={id}
				className={styles.label}
			>
				{label}
			</label>
			<div
				className={
					isDropdownShown?.length
						? styles['drop-down-shown']
						: styles['drop-down']
				}
			>
				{children}
			</div>
			{error === false && (
				<p className={styles['error-message']}>{errorMessage}</p>
			)}
		</div>
	);
};

export default InputWithDropdown;
