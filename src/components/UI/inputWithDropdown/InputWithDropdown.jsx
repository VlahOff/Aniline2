import classes from './InputWithDropdown.module.css';

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
		<div className={`${classes['input-wrapper']} ${className}`}>
			<input
				type={type || 'text'}
				name={id}
				id={id}
				placeholder={label}
				className={classes.input}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				autoComplete="off"
			/>
			<label
				htmlFor={id}
				className={classes.label}
			>
				{label}
			</label>
			<div
				className={
					isDropdownShown?.length
						? classes['drop-down-shown']
						: classes['drop-down']
				}
			>
				{children}
			</div>
			{error === false && (
				<p className={classes['error-message']}>{errorMessage}</p>
			)}
		</div>
	);
};

export default InputWithDropdown;
