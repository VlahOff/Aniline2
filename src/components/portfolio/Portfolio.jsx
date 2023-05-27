import { useEffect } from 'react';
import Button from '../UI/button/Button';
import Card from '../UI/card/Card';
import classes from './Portfolio.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { initializePortfolioState } from '../../store/portfolio-actions';
import PortfolioTable from './portfolioTable/PortfolioTable';
import AddTransactionModal from './addTransactionModal/AddTransactionModal';
import EditTransactionModal from './editTransactionModal/EditTransactionModal';
import { portfolioActions } from '../../store/portfolio';
import { usdPriceParser } from '../../utils/priceParser';

const Portfolio = () => {
  const dispatch = useDispatch();
  const {
    allCoinsList,
    filteredAllCoinsList,
    transactions,
    transactionsTotalValue,
    isAddModalShown,
    isEditModalShown,
    isDeleteModalShown
  } = useSelector(state => state.portfolio);

  useEffect(() => {
    dispatch(initializePortfolioState());
  }, []);

  const openAddTransactionModal = () => {
    dispatch(portfolioActions.toggleAddModal());
  };

  return (
    <>
      {isAddModalShown && <AddTransactionModal allCoinsList={filteredAllCoinsList} />}
      {isEditModalShown && <EditTransactionModal />}
      <Card className={classes.portfolio}>
        <header className={classes.header}>
          <div className={classes['left-part-header']}>
            <h3 className={classes['sub-title']}>Total portfolio value: </h3>
            <p className={classes.value}>{usdPriceParser(transactionsTotalValue)}</p>
          </div>
          <div className={classes['right-part-heder']}>
            <h1 className={classes.title}>My Assets</h1>
            <Button onClick={openAddTransactionModal}>
              <i className={`fa-solid fa-1x fa-plus ${classes['add-btn-icon']}`}></i>
            </Button>
          </div>
        </header>
        <p className={classes['powered-by']}>Powered by CoinGecko</p>
        <main>
          <PortfolioTable transactions={transactions} />
        </main>
      </Card>
    </>
  );
};

export default Portfolio;