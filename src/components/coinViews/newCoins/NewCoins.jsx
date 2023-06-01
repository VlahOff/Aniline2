import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNewCoins } from '../../../store/crypto-actions';
import Card from '../../UI/card/Card';
import CoinDataTable from '../coinDataTable/CoinDataTable';
import GlobalData from '../globalData/GlobalData';

import classes from './NewCoins.module.css';

const NewCoins = () => {
  const dispatch = useDispatch();
  const newCoins = useSelector(state => state.crypto.newCoins);

  useEffect(() => {
    dispatch(getNewCoins());
  }, []);

  return (
    <section className={classes.container}>
      <GlobalData className={classes['global-data']} />
      <Card className={classes.card}>
        <h1 className={classes.title}>New Coins</h1>
        <p className={classes['powered-by']}>Powered by CoinMarketCap</p>
        <CoinDataTable coinData={newCoins} />
      </Card>
    </section>
  );
};

export default NewCoins;