'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isUserLoggedIn, onLogout } from '@/redux/actions/authActions';
import { toggleTheme } from '@/redux/actions/uiActions';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Twirl as Hamburger } from 'hamburger-react';
import ButtonLink from '../buttonLink/ButtonLink';
import LinkTo from '../linkTo/LinkTo';

import darkLogo from '../../public/logo-no-background-black.svg';
import lightLogo from '../../public/logo-no-background-white.svg';
import styles from './Navigation.module.css';

const Navigation = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isNavSticky, setIsNavSticky] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const theme = useSelector(state => state.ui.theme);
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		dispatch(isUserLoggedIn());

		window.onscroll = () => {
			if (window.scrollY >= 200) {
				setIsNavSticky(true);
			} else {
				setIsNavSticky(false);
			}
		};
	}, []);

	const logoutHandler = () => {
		dispatch(onLogout(router));
	};

	const toggleThemeHandler = () => {
		dispatch(toggleTheme);
	};

	const onLinkSelectHandler = () => {
		setIsMenuOpen(s => !s);
	};

	return (
		<nav className={`${styles.nav} ${isNavSticky && styles.sticky}`}>
			<Link
				href={'/'}
				className={styles['logo-wrapper']}
			>
				<Image
					src={theme === 'light' ? darkLogo : lightLogo}
					alt="site logo"
					className={styles.logo}
				/>
			</Link>

			<ul
				className={`${styles.links} 
        ${isMenuOpen ? styles['links-open'] : styles['links-close']}`}
				onClick={onLinkSelectHandler}
			>
				<li>
					<LinkTo href="/search">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</LinkTo>
				</li>
				<li>
					<LinkTo href="/">Home</LinkTo>
				</li>
				<li>
					<LinkTo href="/top-hundred">Top 100</LinkTo>
				</li>
				<li>
					<LinkTo href="/new-coins">New Coins</LinkTo>
				</li>
				<li>
					<LinkTo href="/crypto-converter">Crypto Converter</LinkTo>
				</li>
				{!user && (
					<>
						<li>
							<LinkTo href="/login">Login</LinkTo>
						</li>
						<li>
							<LinkTo href="/register">Register</LinkTo>
						</li>
					</>
				)}
				{user && (
					<>
						<li>
							<LinkTo href="/portfolio">Portfolio</LinkTo>
						</li>
						<li>
							<LinkTo href="/profile">Profile</LinkTo>
						</li>
						<li>
							<ButtonLink onClick={logoutHandler}>Logout</ButtonLink>
						</li>
					</>
				)}
				<li>
					<ButtonLink onClick={toggleThemeHandler}>
						{theme === 'light' ? (
							<FontAwesomeIcon
								icon={faSun}
								className={styles['theme-indicator']}
							/>
						) : (
							<FontAwesomeIcon
								icon={faMoon}
								className={styles['theme-indicator']}
							/>
						)}
					</ButtonLink>
				</li>
			</ul>

			<div className={styles['menu-btn']}>
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
