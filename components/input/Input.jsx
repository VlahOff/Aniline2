import classes from './Input.module.css';

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
				disabled={disabled}
				autoComplete="off"
			/>
			<label
				htmlFor={id}
				className={classes.label}
			>
				{label}
			</label>
			{error === false && (
				<div className={classes['error-message']}>{errorMessage}</div>
			)}
		</div>
	);
};

export default Input;
