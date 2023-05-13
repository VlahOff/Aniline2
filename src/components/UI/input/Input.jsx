import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={`${classes['input-wrapper']} ${props.className}`}>
      <input
        type={props.type || 'text'}
        name={props.id}
        id={props.id}
        placeholder={props.label}
        className={classes.input}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        // autoComplete="off"
      />
      <label htmlFor={props.id} className={classes.label}>{props.label}</label>
      {props.error === false &&
        <p className={classes['error-message']}>{props.errorMessage}</p>
      }
    </div>
  );
};

export default Input;
