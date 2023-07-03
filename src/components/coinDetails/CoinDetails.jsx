import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCoinDetails } from '../../store/crypto-actions';
import { percentParser } from '../../utils/percentParser';
import { usdPriceParser } from '../../utils/priceParser';
import Card from '../UI/card/Card';
import PercentTicker from '../shared/percentTicker/PercentTicker';
import CoinChart from './coinChart/CoinChart';

import classes from './CoinDetails.module.css';

const timeParser = date => {
	return new Date(date).toLocaleString('en-UK', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const CoinDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const coin = useSelector(state => state.crypto.coinDetails);
	const coinDetailsOHLC = useSelector(state => state.crypto.coinDetailsOHLC);

	useEffect(() => {
		dispatch(getCoinDetails(id));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<div className={classes.wrapper}>
			<Card className={classes['details-page']}>
				<header className={classes.header}>
					<div className={classes['top-header-container']}>
						<div className={classes['name-container']}>
							<img
								className={classes['coin-logo']}
								src={coin?.image?.small}
								alt="Coin logo"
							/>
							<h1 className={classes['coin-name']}>{coin?.name}</h1>
							<strong className={classes.symbol}>
								{coin?.symbol?.toUpperCase()}
							</strong>
						</div>
						<div className={classes['price-container']}>
							<p className={classes.price}>
								{usdPriceParser(coin?.current_price)}
							</p>
							<PercentTicker
								percent={coin?.price_change_percentage_24h}
								className={classes['percent-ticker']}
							/>
						</div>
					</div>
					<div className={classes['bottom-header-container']}>
						<div className={classes['bar-container']}>
							<div className={classes.bar}>
								<div
									className={classes['bar-progress']}
									style={{ width: `${coin?.low_high_value}%` }}
								>
									<i className={`${classes.arrow} fa-solid fa-caret-up`}></i>
								</div>
							</div>
							<div className={classes['bar-titles']}>
								<p>Low: {usdPriceParser(coin?.low_24h)}</p>
								<p>High: {usdPriceParser(coin?.high_24h)}</p>
							</div>
						</div>
					</div>
				</header>
				<main className={classes.main}>
					<div className={classes['coin-info']}>
						<div className={classes.cell}>
							<h5 className={classes['cell-title']}>Market Cap</h5>
							<div>
								<p>{usdPriceParser(coin?.market_cap)}</p>
								<p>{percentParser(coin?.market_cap_change_percentage_24h)}</p>
							</div>
						</div>
						<div className={classes.cell}>
							<h5 className={classes['cell-title']}>Circulating Supply</h5>
							<div>
								<p>
									{coin?.circulating_supply} {coin?.symbol?.toUpperCase()}
								</p>
								<p>Max Supply: {coin?.max_supply}</p>
							</div>
						</div>
						<div className={classes.cell}>
							<h5 className={classes['cell-title']}>Volume</h5>
							<p>{usdPriceParser(coin?.total_volume)}</p>
						</div>
						<div className={classes.cell}>
							<h5 className={classes['cell-title']}>All Time High</h5>
							<div>
								<p>{usdPriceParser(coin?.ath)}</p>
								<p>{percentParser(coin?.ath_change_percentage)}</p>
								<time>
									<p className={classes.timestamp}>
										{timeParser(coin?.ath_date)}
									</p>
								</time>
							</div>
						</div>
						<div className={classes.cell}>
							<h5 className={classes['cell-title']}>All Time Low</h5>
							<div>
								<p>{usdPriceParser(coin?.atl)}</p>
								<p>{percentParser(coin?.atl_change_percentage)}</p>
								<time>
									<p className={classes.timestamp}>
										{timeParser(coin?.atl_date)}
									</p>
								</time>
							</div>
						</div>
					</div>
					<CoinChart
						coinName={coin?.name}
						coinId={id}
						coinDetailsOHLC={coinDetailsOHLC}
					/>
				</main>
				<p className={classes['powered-by']}>Powered by CoinGecko</p>
			</Card>
		</div>
	);
};

export default CoinDetails;
