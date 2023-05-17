import classes from './Button.module.css';

const Button = ({
  className,
  type,
  onClick,
  disabled,
  children
}) => {
  return <button
    className={`${className} ${classes.btn}`}
    type={type || 'button'}
    onClick={onClick}
    disabled={disabled}
  >{children}</button>;
};

export default Button;