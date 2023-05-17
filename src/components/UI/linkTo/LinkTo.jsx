import { Link } from 'react-router-dom';
import classes from './LinkTo.module.css';

const LinkTo = ({
  to,
  children,
  className
}) => {
  const styles = `${classes.link} ${className}`;
  return <Link to={to} className={styles}>{children}</Link>;
};

export default LinkTo;