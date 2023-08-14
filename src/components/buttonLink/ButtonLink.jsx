import classes from './ButtonLink.module.css';

const ButtonLink = ({ className, type, onClick, disabled, children }) => {
	return (
		<button
			className={`${className} ${classes.btn}`}
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default ButtonLink;
