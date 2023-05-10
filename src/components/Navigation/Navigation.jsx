import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <nav>
        <ul className={classes.links}>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;