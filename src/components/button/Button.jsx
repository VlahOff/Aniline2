import classes from './Button.module.css';

const Button = ({ className, id, type, onClick, disabled, children }) => {
	return (
		<button
			className={`${className} ${classes.btn}`}
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
