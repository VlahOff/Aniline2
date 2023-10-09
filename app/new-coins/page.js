'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/card/Card';
import CoinDataTable from '@/components/coinDataTable/CoinDataTable';
import GlobalData from '@/components/globalData/GlobalData';
import useIsInViewport from '@/hooks/useIsInViewport';
import {
	getNewCoins,
	getNextPageOnNewCoins,
} from '@/redux/actions/cryptoActions';

import styles from './page.module.css';

const NewCoins = () => {
	const dispatch = useDispatch();
	const newCoins = useSelector(state => state.crypto.newCoins);

	const infiniteScrollElement = useRef(null);
	const isInView = useIsInViewport(infiniteScrollElement);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getNewCoins());
	}, []);

	useEffect(() => {
		if (isInView && page !== 0) {
			dispatch(getNextPageOnNewCoins(page + 1));
		}
		if (isInView) {
			setPage(s => s + 1);
		}
	}, [isInView]);

	return (
		<section className={styles.container}>
			<GlobalData className={styles['global-data']} />
			<Card className={styles.card}>
				<h1 className={styles.title}>New Coins</h1>
				<p className={styles['powered-by']}>Powered by CoinMarketCap</p>
				<CoinDataTable coinData={newCoins} />
				<div
					ref={infiniteScrollElement}
					className={styles['infinite-scroll-element']}
				></div>
			</Card>
		</section>
	);
};

export default NewCoins;
