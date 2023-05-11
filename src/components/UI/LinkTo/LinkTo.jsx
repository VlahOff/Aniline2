import { Link } from 'react-router-dom';
import classes from './LinkTo.module.css';

const LinkTo = (props) => {
  return <Link to={props.to} className={classes.link}>{props.children}</Link>;
};

export default LinkTo;