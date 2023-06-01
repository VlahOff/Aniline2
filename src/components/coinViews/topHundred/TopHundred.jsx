import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTopHundred } from '../../../store/crypto-actions';
import Card from '../../UI/card/Card';
import CoinDataTable from '../coinDataTable/CoinDataTable';
import GlobalData from '../globalData/GlobalData';

import classes from './TopHundred.module.css';

const TopHundred = () => {
  const dispatch = useDispatch();
  const topHundred = useSelector(state => state.crypto.topHundred);

  useEffect(() => {
    dispatch(getTopHundred());
  }, []);

  return (
    <section className={classes.container}>
      <GlobalData className={classes['global-data']} />
      <Card className={classes.card}>
        <h1 className={classes.title}>Top Hundred</h1>
        <p className={classes['powered-by']}>Powered by CoinGecko</p>
        <CoinDataTable coinData={topHundred} />
      </Card>
    </section>
  );
};

export default TopHundred;
