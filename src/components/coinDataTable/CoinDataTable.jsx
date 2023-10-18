import { useNavigate } from 'react-router-dom';

import { usdPriceParser } from '../../utils/priceParser';
import PercentTicker from '../percentTicker/PercentTicker';

import classes from './CoinDataTable.module.css';

const CoinDataTable = ({ coinData }) => {
	const navigate = useNavigate();

	const onCoinSelect = id => {
		navigate(`/coin-details/${id}`);
	};

	return (
		<div className={classes['table-container']}>
			<table className={classes.table}>
				<thead>
					<tr>
						<th className={`${classes['sticky-col']} ${classes['first-col']}`}>
							#
						</th>
						<th
							className={`${classes['sticky-col']} ${classes['second-col']}`}
						></th>
						<th className={`${classes['sticky-col']} ${classes['third-col']}`}>
							Coin
						</th>
						<th className={classes['fourth-col']}>Sym</th>
						<th className={classes['fifth-col']}>Price</th>
						<th className={classes['sixth-col']}>1h</th>
						<th className={classes['seventh-col']}>24h</th>
						<th className={classes['eighth-col']}>7d</th>
						<th className={classes['ninth-col']}>Mkt Cap</th>
						<th className={classes['tenth-col']}>Total Supply</th>
					</tr>
				</thead>
				<tbody className={classes.tbody}>
					{coinData.map((coin, index) => {
						return (
							<tr
								key={coin.id}
								className="table-row"
								onClick={() => onCoinSelect(coin.id)}
							>
								<td
									className={`${classes['sticky-col']} ${classes['first-col']}`}
								>
									<p>{index + 1}</p>
								</td>
								<td
									className={`${classes['sticky-col']} ${classes['second-col']}`}
								>
									<img
										src={coin.image}
										alt={`${coin.symbol} logo`}
									/>
								</td>
								<td
									className={`${classes['sticky-col']} ${classes['third-col']}`}
								>
									<p>{coin.name}</p>
								</td>
								<td className={classes['fourth-col']}>
									<p>{coin?.symbol?.toUpperCase()}</p>
								</td>
								<td className={classes['fifth-col']}>
									<p>{usdPriceParser(coin.current_price)}</p>
								</td>
								<td className={classes['sixth-col']}>
									<PercentTicker
										className={classes.ticker}
										percent={coin.price_change_percentage_1h_in_currency}
									/>
								</td>
								<td className={classes['seventh-col']}>
									<PercentTicker
										className={classes.ticker}
										percent={coin.price_change_percentage_24h_in_currency}
									/>
								</td>
								<td className={classes['eighth-col']}>
									<PercentTicker
										className={classes.ticker}
										percent={coin.price_change_percentage_7d_in_currency}
									/>
								</td>
								<td className={classes['ninth-col']}>
									<p>{usdPriceParser(coin.market_cap)}</p>
								</td>
								<td className={classes['tenth-col']}>
									<p>{usdPriceParser(coin.total_supply)}</p>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CoinDataTable;
