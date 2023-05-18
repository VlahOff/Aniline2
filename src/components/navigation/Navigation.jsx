import { useDispatch, useSelector } from 'react-redux';

import { onLogout } from '../../store/auth-actions';
import { toggleTheme } from '../../store/ui-actions';
import ButtonLink from '../UI/buttonLink/ButtonLink';
import LinkTo from '../UI/linkTo/LinkTo';

import darkLogo from '../../assets/logo-dark.png';
import lightLogo from '../../assets/logo-white.png';
import classes from './Navigation.module.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);
  const user = useSelector(state => state.auth.user);

  const logoutHandler = () => {
    dispatch(onLogout());
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes['logo-wrapper']}>
          <img
            src={theme === 'light' ? darkLogo : lightLogo}
            alt="site logo"
            className={classes.logo}
          />
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
            <LinkTo to='/crypto-converter'>Crypto Converter</LinkTo>
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
                <LinkTo to='/portfolio'>Portfolio</LinkTo>
              </li>
              <li>
                <LinkTo to='/profile'>Profile</LinkTo>
              </li>
              <li>
                <ButtonLink onClick={logoutHandler}>Logout</ButtonLink>
              </li>
            </>
          }
          <li>
            <ButtonLink onClick={toggleThemeHandler}>
              {theme === 'light' ?
                <i className={`fa-regular fa-sun ${classes['theme-indicator']}`}></i>
                :
                <i className={`fa-regular fa-moon ${classes['theme-indicator']}`}></i>
              }
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;