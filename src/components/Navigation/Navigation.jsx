import classes from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../store/auth-actions';
import LinkTo from '../UI/LinkTo/LinkTo';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const logoutHandler = () => {
    dispatch(onLogout());
  };

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes['logo-wrapper']}>
          <h2>Aniline 2</h2>
        </div>
        <ul className={classes.links}>
          <li>
            <LinkTo to='/'>Home</LinkTo>
          </li>
          <li>
            <LinkTo to='/top-hundred'>Top 100</LinkTo>
          </li>
          <li>
            <LinkTo to='/new-coins'>New Coins</LinkTo>
          </li>
          <li>
            <LinkTo to='/'>Crypto Converter</LinkTo>
          </li>
          {!user &&
            <>
              <li>
                <LinkTo to='/login'>Login</LinkTo>
              </li>
              <li>
                <LinkTo to='/register'>Register</LinkTo>
              </li>
            </>
          }
          {user &&
            <>
              <li>
                <LinkTo to='/'>Portfolio</LinkTo>
              </li>
              <li>
                <LinkTo to='/'>Profile</LinkTo>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
              <li>
                <p>{user?.username}</p>
              </li>
            </>
          }
        </ul>
      </nav>
    </>
  );
};

export default Navigation;