import { useDispatch } from 'react-redux';

import { portfolioActions } from '../../redux/portfolio';
import { usdPriceParser } from '../../utils/priceParser';
import PercentTicker from '../percentTicker/PercentTicker';

import styles from './PortfolioTable.module.css';

const PortfolioTable = ({ transactions }) => {
	const dispatch = useDispatch();

	const onTransactionSelect = transaction => {
		dispatch(portfolioActions.setSelectedTransaction(transaction));
	};

	return (
		<div className={styles['table-container']}>
			<table className={styles.table}>
				<thead>
					<tr>
						<td className={`${styles['first-col']} ${styles['sticky-col']}`}>
							<p>Asset</p>
						</td>
						<td className={styles['second-col']}>
							<p>Balance</p>
						</td>
						<td className={styles['third-col']}>
							<p>Bought Price (USD)</p>
						</td>
						<td className={styles['fourth-col']}>
							<p>Current Price (USD)</p>
						</td>
						<td className={styles['fifth-col']}>
							<p>24h Change (%)</p>
						</td>
						<td className={styles['sixth-col']}>
							<p>PNL</p>
						</td>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{transactions &&
						transactions.map(t => {
							return (
								<tr
									key={t.transactionId}
									className={styles.tr}
									onClick={() => onTransactionSelect(t)}
								>
									<td
										className={`${styles['first-col']} ${styles['sticky-col']}`}
									>
										<img
											src={t.image}
											alt="coin logo"
										/>
										<div className="asset-name">
											<strong>{t.name}</strong>
											<p>{t.symbol.toUpperCase()}</p>
										</div>
									</td>
									<td className={styles['second-col']}>
										<strong>
											{t.quantity} {t.symbol.toUpperCase()}
										</strong>
										<p className={styles.spacer}>≈</p>
										<p>{usdPriceParser(t.value)}</p>
									</td>
									<td className={styles['third-col']}>
										<p>{usdPriceParser(t.boughtPrice)}</p>
									</td>
									<td className={styles['fourth-col']}>
										<p>{usdPriceParser(t.current_price)}</p>
									</td>
									<td className={styles['fifth-col']}>
										<PercentTicker
											percent={t.price_change_percentage_24h}
											className={styles.ticker}
										/>
									</td>
									<td className={styles['sixth-col']}>
										<p>{usdPriceParser(t.pnlValue)}</p>
										<PercentTicker
											percent={t.pnlPercent}
											className={styles.ticker}
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default PortfolioTable;
