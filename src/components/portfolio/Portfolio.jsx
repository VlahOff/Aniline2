import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { portfolioActions } from '../../store/portfolio';
import { initializePortfolioState } from '../../store/portfolio-actions';
import { usdPriceParser } from '../../utils/priceParser';
import Button from '../UI/button/Button';
import Card from '../UI/card/Card';
import AddTransactionModal from './addTransactionModal/AddTransactionModal';
import EditTransactionModal from './editTransactionModal/EditTransactionModal';
import PortfolioTable from './portfolioTable/PortfolioTable';

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
  } = useSelector((state) => state.portfolio);

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
        <header className={classes.header}>
          <div className={classes['left-part-header']}>
            <h3 className={classes['sub-title']}>Total balance: </h3>
            <p className={classes.value}>
              {usdPriceParser(transactionsBalance)}
            </p>
            <h3 className={classes['sub-title']}>Total Profit Loss</h3>
            <p className={classes.value}>
              {usdPriceParser(transactionProfitLoss)}
            </p>
          </div>
          <div className={classes['right-part-heder']}>
            <h1 className={classes.title}>My Assets</h1>
            <Button onClick={openAddTransactionModal}>
              <i
                className={`fa-solid fa-1x fa-plus ${classes['add-btn-icon']}`}
              ></i>
            </Button>
          </div>
        </header>
        <p className={classes['powered-by']}>Powered by CoinGecko</p>
        <main>
          {transactions.length > 0 && (
            <PortfolioTable transactions={transactions} />
          )}
          {transactions.length === 0 && (
            <p className={classes['info-message']}>
              No transactions added yet.
            </p>
          )}
        </main>
      </Card>
    </>
  );
};

export default Portfolio;
