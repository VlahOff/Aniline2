import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useIsInViewport from '../../../hooks/useIsInViewport';
import {
	getNewCoins,
	getNextPageOnNewCoins,
} from '../../../store/crypto-actions';
import Card from '../../UI/card/Card';
import CoinDataTable from '../coinDataTable/CoinDataTable';
import GlobalData from '../globalData/GlobalData';

import classes from './NewCoins.module.css';

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
		<section className={classes.container}>
			<GlobalData className={classes['global-data']} />
			<Card className={classes.card}>
				<h1 className={classes.title}>New Coins</h1>
				<p className={classes['powered-by']}>Powered by CoinMarketCap</p>
				<CoinDataTable coinData={newCoins} />
				<div
					ref={infiniteScrollElement}
					className={classes['infinite-scroll-element']}
				></div>
			</Card>
		</section>
	);
};

export default NewCoins;
