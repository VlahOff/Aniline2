import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTransactionModal from '../../components/addTransactionModal/AddTransactionModal';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import EditTransactionModal from '../../components/editTransactionModal/EditTransactionModal';
import PortfolioTable from '../../components/portfolioTable/PortfolioTable';
import { portfolioActions } from '../../store/portfolio';
import { initializePortfolioState } from '../../store/portfolio-actions';
import { usdPriceParser } from '../../utils/priceParser';

import classes from './Portfolio.module.css';

const Portfolio = () => {
	const dispatch = useDispatch();
	const {
		filteredAllCoinsList,
		transactions,
		transactionsBalance,
		transactionProfitLoss,
		isAddModalShown,
		isEditModalShown,
	} = useSelector(state => state.portfolio);

	useEffect(() => {
		dispatch(initializePortfolioState());
	}, []);

	const openAddTransactionModal = () => {
		dispatch(portfolioActions.toggleAddModal());
	};

	return (
		<>
			{isAddModalShown && (
				<AddTransactionModal allCoinsList={filteredAllCoinsList} />
			)}
			{isEditModalShown && <EditTransactionModal />}
			<Card className={classes.portfolio}>
				<h1 className={classes.title}>My Assets</h1>
				<header className={classes.header}>
					<div className={classes['transactions-info-wrapper']}>
						<div className={classes['info-box']}>
							<h3>Total balance</h3>
							<p>{usdPriceParser(transactionsBalance)}</p>
						</div>
						<div className={classes['info-box']}>
							<h3>Total Profit Loss</h3>
							<p>{usdPriceParser(transactionProfitLoss)}</p>
						</div>
					</div>
					<Button
						className={classes['add-btn']}
						onClick={openAddTransactionModal}
					>
						Add transaction
					</Button>
				</header>
				<p className={classes['powered-by']}>Powered by CoinGecko</p>
				<main>
					{transactions.length > 0 && (
						<PortfolioTable transactions={transactions} />
					)}
					{transactions.length === 0 && (
						<p className={classes['no-transactions-message']}>
							No transactions added yet.
						</p>
					)}
				</main>
			</Card>
		</>
	);
};

export default Portfolio;
