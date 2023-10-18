import Image from 'next/image';
import Link from 'next/link';
import { usdPriceParser } from '../../utils/priceParser';
import PercentTicker from '../percentTicker/PercentTicker';

import styles from './CoinDataTable.module.css';

const CoinDataTable = ({ coinData }) => {
	return (
		<div className={styles['table-container']}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={`${styles['sticky-col']} ${styles['first-col']}`}>
							#
						</th>
						<th
							className={`${styles['sticky-col']} ${styles['second-col']}`}
						></th>
						<th className={`${styles['sticky-col']} ${styles['third-col']}`}>
							Coin
						</th>
						<th className={styles['fourth-col']}>Sym</th>
						<th className={styles['fifth-col']}>Price</th>
						<th className={styles['sixth-col']}>1h</th>
						<th className={styles['seventh-col']}>24h</th>
						<th className={styles['eighth-col']}>7d</th>
						<th className={styles['ninth-col']}>Mkt Cap</th>
						<th className={styles['tenth-col']}>Total Supply</th>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{coinData.map((coin, index) => {
						return (
							<Link
								key={coin.id}
								href={`/coinDetails/${coin.id}`}
							>
								<tr className="table-row">
									<td
										className={`${styles['sticky-col']} ${styles['first-col']}`}
									>
										<p>{index + 1}</p>
									</td>
									<td
										className={`${styles['sticky-col']} ${styles['second-col']}`}
									>
										<Image
											src={coin.image}
											alt={`${coin.symbol} logo`}
											width={35}
											height={35}
										/>
									</td>
									<td
										className={`${styles['sticky-col']} ${styles['third-col']}`}
									>
										<p>{coin.name}</p>
									</td>
									<td className={styles['fourth-col']}>
										<p>{coin.symbol.toUpperCase()}</p>
									</td>
									<td className={styles['fifth-col']}>
										<p>{usdPriceParser(coin.current_price)}</p>
									</td>
									<td className={styles['sixth-col']}>
										<PercentTicker
											className={styles.ticker}
											percent={coin.price_change_percentage_1h_in_currency}
										/>
									</td>
									<td className={styles['seventh-col']}>
										<PercentTicker
											className={styles.ticker}
											percent={coin.price_change_percentage_24h_in_currency}
										/>
									</td>
									<td className={styles['eighth-col']}>
										<PercentTicker
											className={styles.ticker}
											percent={coin.price_change_percentage_7d_in_currency}
										/>
									</td>
									<td className={styles['ninth-col']}>
										<p>{usdPriceParser(coin.market_cap)}</p>
									</td>
									<td className={styles['tenth-col']}>
										<p>{usdPriceParser(coin.total_supply)}</p>
									</td>
								</tr>
							</Link>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CoinDataTable;
