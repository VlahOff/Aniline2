'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/card/Card';
import CoinChart from '@/components/coinChart/CoinChart';
import PercentTicker from '@/components/percentTicker/PercentTicker';
import { getCoinDetails } from '@/redux/actions/cryptoActions';
import { cryptoActions } from '@/redux/slices/cryptoSlice';
import { percentParser } from '@/utils/percentParser';
import { usdPriceParser } from '@/utils/priceParser';

import styles from './page.module.css';

const timeParser = date => {
	return new Date(date).toLocaleString('en-UK', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const CoinDetails = ({ params }) => {
	const dispatch = useDispatch();
	const coin = useSelector(state => state.crypto.coinDetails);
	const coinDetailsOHLC = useSelector(state => state.crypto.coinDetailsOHLC);

	useEffect(() => {
		dispatch(getCoinDetails(params.id));
		window.scrollTo({ top: 0, behavior: 'instant' });

		return () => {
			dispatch(cryptoActions.setCoinDetails({}));
			dispatch(cryptoActions.setCoinDetailsOHLC([]));
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<Card className={styles['details-page']}>
				<header className={styles.header}>
					<div className={styles['top-header-container']}>
						<div className={styles['name-container']}>
							<Image
								className={styles['coin-logo']}
								src={coin?.image?.small}
								alt="Coin logo"
								width={32}
								height={32}
							/>
							<h1 className={styles['coin-name']}>{coin?.name}</h1>
							<strong className={styles.symbol}>
								{coin?.symbol?.toUpperCase()}
							</strong>
						</div>
						<div className={styles['price-container']}>
							<p className={styles.price}>
								{usdPriceParser(coin?.current_price)}
							</p>
							<PercentTicker
								percent={coin?.price_change_percentage_24h}
								className={styles['percent-ticker']}
							/>
						</div>
					</div>
					<div className={styles['bottom-header-container']}>
						<div className={styles['bar-container']}>
							<div className={styles.bar}>
								<div
									className={styles['bar-progress']}
									style={{ width: `${coin?.low_high_value}%` }}
								>
									<i className={`${styles.arrow} fa-solid fa-caret-up`}></i>
								</div>
							</div>
							<div className={styles['bar-titles']}>
								<p>Low: {usdPriceParser(coin?.low_24h)}</p>
								<p>High: {usdPriceParser(coin?.high_24h)}</p>
							</div>
						</div>
					</div>
				</header>
				<main className={styles.main}>
					<div className={styles['coin-info']}>
						<div className={styles.cell}>
							<h5 className={styles['cell-title']}>Market Cap</h5>
							<div>
								<p>{usdPriceParser(coin?.market_cap)}</p>
								<p>{percentParser(coin?.market_cap_change_percentage_24h)}</p>
							</div>
						</div>
						<div className={styles.cell}>
							<h5 className={styles['cell-title']}>Circulating Supply</h5>
							<div>
								<p>
									{coin?.circulating_supply} {coin?.symbol?.toUpperCase()}
								</p>
								<p>Max Supply: {coin?.max_supply}</p>
							</div>
						</div>
						<div className={styles.cell}>
							<h5 className={styles['cell-title']}>Volume</h5>
							<p>{usdPriceParser(coin?.total_volume)}</p>
						</div>
						<div className={styles.cell}>
							<h5 className={styles['cell-title']}>All Time High</h5>
							<div>
								<p>{usdPriceParser(coin?.ath)}</p>
								<p>{percentParser(coin?.ath_change_percentage)}</p>
								<time>
									<p className={styles.timestamp}>
										{timeParser(coin?.ath_date)}
									</p>
								</time>
							</div>
						</div>
						<div className={styles.cell}>
							<h5 className={styles['cell-title']}>All Time Low</h5>
							<div>
								<p>{usdPriceParser(coin?.atl)}</p>
								<p>{percentParser(coin?.atl_change_percentage)}</p>
								<time>
									<p className={styles.timestamp}>
										{timeParser(coin?.atl_date)}
									</p>
								</time>
							</div>
						</div>
					</div>
					<CoinChart
						coinName={coin?.name}
						coinId={params.id}
						coinDetailsOHLC={coinDetailsOHLC}
					/>
				</main>
				<p className={styles['powered-by']}>Powered by CoinGecko</p>
			</Card>
		</div>
	);
};

export default CoinDetails;
