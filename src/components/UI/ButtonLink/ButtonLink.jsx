import classes from './ButtonLink.module.css';

const ButtonLink = (props) => {
  return <button
    className={`${props.className} ${classes.btn}`}
    type={props.type || 'button'}
    onClick={props.onClick}
    disabled={props.disabled}
  >{props.children}</button>;
};

export default ButtonLink;