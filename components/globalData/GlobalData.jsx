import { useSelector } from 'react-redux';

import { percentParser } from '../../utils/percentParser';
import { usdPriceParser } from '../../utils/priceParser';
import Card from '../card/Card';

import styles from './GlobalData.module.css';

const GlobalData = props => {
	const globalData = useSelector(state => state.crypto.globalData);

	return (
		<section
			className={`${styles['global-data-container']} ${props.className}`}
		>
			<Card className={styles.card}>
				<h3 className={styles.title}>Market Capitalization</h3>
				<hr />
				<div className={styles['bottom-row']}>
					<p>{usdPriceParser(globalData.total_market_cap)}</p>
					<p>
						{percentParser(globalData.market_cap_change_percentage_24h_usd)}
					</p>
				</div>
			</Card>
			<Card className={styles.card}>
				<h3 className={styles.title}>24h Trading Volume</h3>
				<hr />
				<div className={styles['bottom-row']}>
					<p>{usdPriceParser(globalData.trading_volume)}</p>
				</div>
			</Card>
			<Card className={styles.card}>
				<h3 className={styles.title}>BTC Market Cap Dominance</h3>
				<hr />
				<div className={styles['bottom-row']}>
					<p>{percentParser(globalData.btc_dominance)}</p>
				</div>
			</Card>
			<Card className={styles.card}>
				<h3 className={styles.title}># of Coins</h3>
				<hr />
				<div className={styles['bottom-row']}>
					<p>{globalData.number_of_coins}</p>
				</div>
			</Card>
		</section>
	);
};

export default GlobalData;
