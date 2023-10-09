'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/card/Card';
import CoinDataTable from '@/components/coinDataTable/CoinDataTable';
import GlobalData from '@/components/globalData/GlobalData';
import useIsInViewport from '@/hooks/useIsInViewport';
import {
	getNextPageOnTopHundred,
	getTopHundred,
} from '@/redux/actions/cryptoActions';

import styles from './page.module.css';

const TopHundred = () => {
	const dispatch = useDispatch();
	const topHundred = useSelector(state => state.crypto.topHundred);
	const infiniteScrollElement = useRef(null);
	const isInView = useIsInViewport(infiniteScrollElement);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getTopHundred());
	}, [dispatch]);

	useEffect(() => {
		if (isInView && page !== 0) {
			dispatch(getNextPageOnTopHundred(page + 1));
		}
		if (isInView) {
			setPage(s => s + 1);
		}
	}, [isInView]);

	return (
		<section className={styles.container}>
			<GlobalData className={styles['global-data']} />
			<Card className={styles.card}>
				<h1 className={styles.title}>Top Hundred</h1>
				<p className={styles['powered-by']}>Powered by CoinGecko</p>
				<CoinDataTable coinData={topHundred} />
				<div
					ref={infiniteScrollElement}
					className={styles['infinite-scroll-element']}
				></div>
			</Card>
		</section>
	);
};

export default TopHundred;
