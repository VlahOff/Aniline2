import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CryptoCard from '../../components/cryptoCard/CryptoCard';
import { getTopThree } from '../../store/crypto-actions';

import logoBlack from '../../assets/logo-no-background-black.svg';
import logoWhite from '../../assets/logo-no-background-white.svg';
import classes from './Home.module.css';

const Home = () => {
	const dispatch = useDispatch();
	const topThree = useSelector(state => state.crypto.topThree);
	const theme = useSelector(state => state.ui.theme);

	useEffect(() => {
		dispatch(getTopThree());
	}, []);

	return (
		<div className={classes.wrapper}>
			<section className={classes.home}>
				{theme === 'dark' ? (
					<img
						src={logoWhite}
						alt="Site logo"
						className={classes.logo}
					/>
				) : (
					<img
						src={logoBlack}
						alt="Site logo"
						className={classes.logo}
					/>
				)}
				<h1 className={classes.title}>Track your crypto gains!</h1>
				<div className={classes['card-wrapper']}>
					{topThree.map(c => (
						<CryptoCard
							key={c.id}
							{...c}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
