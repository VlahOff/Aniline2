import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Twirl as Hamburger } from 'hamburger-react';
import { onLogout } from '../../store/auth-actions';
import { toggleTheme } from '../../store/ui-actions';
import ButtonLink from '../UI/buttonLink/ButtonLink';
import LinkTo from '../UI/linkTo/LinkTo';

import darkLogo from '../../assets/logo-no-background-black.svg';
import lightLogo from '../../assets/logo-no-background-white.svg';
import classes from './Navigation.module.css';

const Navigation = () => {
	const [isNavSticky, setIsNavSticky] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const theme = useSelector(state => state.ui.theme);
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY >= 200) {
				setIsNavSticky(true);
			} else {
				setIsNavSticky(false);
			}
		};
	}, []);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(onLogout(navigate));
	};

	const toggleThemeHandler = () => {
		dispatch(toggleTheme());
	};

	const onLinkSelectHandler = () => {
		setIsMenuOpen(s => !s);
	};

	return (
		<nav className={`${classes.nav} ${isNavSticky && classes.sticky}`}>
			<Link
				to={'/'}
				className={classes['logo-wrapper']}
			>
				<img
					src={theme === 'light' ? darkLogo : lightLogo}
					alt="site logo"
					className={classes.logo}
				/>
			</Link>

			<ul
				className={`${classes.links} 
        ${isMenuOpen ? classes['links-open'] : classes['links-close']}`}
				onClick={onLinkSelectHandler}
			>
				<li>
					<LinkTo to="/search">
						<i className="fa-solid fa-magnifying-glass"></i>
					</LinkTo>
				</li>
				<li>
					<LinkTo to="/">Home</LinkTo>
				</li>
				<li>
					<LinkTo to="/top-hundred">Top 100</LinkTo>
				</li>
				<li>
					<LinkTo to="/new-coins">New Coins</LinkTo>
				</li>
				<li>
					<LinkTo to="/crypto-converter">Crypto Converter</LinkTo>
				</li>
				{!user && (
					<>
						<li>
							<LinkTo to="/login">Login</LinkTo>
						</li>
						<li>
							<LinkTo to="/register">Register</LinkTo>
						</li>
					</>
				)}
				{user && (
					<>
						<li>
							<LinkTo to="/portfolio">Portfolio</LinkTo>
						</li>
						<li>
							<LinkTo to="/profile">Profile</LinkTo>
						</li>
						<li>
							<ButtonLink onClick={logoutHandler}>Logout</ButtonLink>
						</li>
					</>
				)}
				<li>
					<ButtonLink onClick={toggleThemeHandler}>
						{theme === 'light' ? (
							<i
								className={`fa-regular fa-sun ${classes['theme-indicator']}`}
							></i>
						) : (
							<i
								className={`fa-regular fa-moon ${classes['theme-indicator']}`}
							></i>
						)}
					</ButtonLink>
				</li>
			</ul>

			<div className={classes['menu-btn']}>
				<Hamburger
					toggled={isMenuOpen}
					toggle={setIsMenuOpen}
					color={theme === 'dark' ? '#fff' : '#000'}
				/>
			</div>
		</nav>
	);
};

export default Navigation;
