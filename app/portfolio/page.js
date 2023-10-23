'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTransactionModal from '@/components/addTransactionModal/AddTransactionModal';
import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import EditTransactionModal from '@/components/editTransactionModal/EditTransactionModal';
import PortfolioTable from '@/components/portfolioTable/PortfolioTable';
import { usdPriceParser } from '@/utils/priceParser';

import styles from './page.module.css';

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
		// dispatch(initializePortfolioState());
	}, []);

	const openAddTransactionModal = () => {
		// dispatch(portfolioActions.toggleAddModal());
	};

	return (
		<>
			{isAddModalShown && (
				<AddTransactionModal allCoinsList={filteredAllCoinsList} />
			)}
			{isEditModalShown && <EditTransactionModal />}
			<section className={styles.wrapper}>
				<Card className={styles.portfolio}>
					<h1 className={styles.title}>My Assets</h1>
					<header className={styles.header}>
						<div className={styles['transactions-info-wrapper']}>
							<div className={styles['info-box']}>
								<h3>Total balance</h3>
								<p>{usdPriceParser(transactionsBalance)}</p>
							</div>
							<div className={styles['info-box']}>
								<h3>Total Profit Loss</h3>
								<p>{usdPriceParser(transactionProfitLoss)}</p>
							</div>
						</div>
						<Button
							className={styles['add-btn']}
							onClick={openAddTransactionModal}
						>
							Add transaction
						</Button>
					</header>
					<p className={styles['powered-by']}>Powered by CoinGecko</p>
					<main className={styles.main}>
						{transactions.length > 0 && (
							<PortfolioTable transactions={transactions} />
						)}
						{transactions.length === 0 && (
							<p className={styles['no-transactions-message']}>
								No transactions added yet.
							</p>
						)}
					</main>
				</Card>
			</section>
		</>
	);
};

export default Portfolio;
