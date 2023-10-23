'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CryptoCard from '@/components/cryptoCard/CryptoCard';
import { getTopThree } from '@/redux/actions/cryptoActions';

import logoBlack from '../public/logo-no-background-black.svg';
import logoWhite from '../public/logo-no-background-white.svg';
import styles from './page.module.css';

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
						quality={100}
					/>
				) : (
					<Image
						src={logoBlack}
						alt="Site logo"
						className={styles.logo}
						quality={100}
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
