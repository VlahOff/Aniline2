'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import logoBlack from '../public/logo-no-background-black.svg';
import logoWhite from '../public/logo-no-background-white.svg';
import styles from './page.module.css';
import CryptoCard from '@/components/cryptoCard/CryptoCard';
import { useEffect } from 'react';
import { getTopThree } from '@/redux/actions/cryptoActions';

export default function Home() {
	const dispatch = useDispatch();
	const theme = useSelector(state => state.ui.theme);
	const topThree = useSelector(state => state.crypto.topThree);

	useEffect(() => {
		dispatch(getTopThree());
	}, []);

	return (
		<section className={styles.section}>
			<div className={styles['home-section']}>
				{theme === 'dark' ? (
					<Image
						src={logoWhite}
						alt="Site logo"
						className={styles.logo}
					/>
				) : (
					<Image
						src={logoBlack}
						alt="Site logo"
						className={styles.logo}
					/>
				)}
				<h1 className={styles.title}>Track your crypto gains!</h1>
				<div className={styles['card-wrapper']}>
					{topThree.map(c => (
						<CryptoCard
							key={c.id}
							{...c}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
