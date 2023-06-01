import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useIsInViewport from '../../../hooks/useIsInViewport';
import { getNextPageOnTopHundred, getTopHundred } from '../../../store/crypto-actions';
import Card from '../../UI/card/Card';
import CoinDataTable from '../coinDataTable/CoinDataTable';
import GlobalData from '../globalData/GlobalData';

import classes from './TopHundred.module.css';

const TopHundred = () => {
  const dispatch = useDispatch();
  const topHundred = useSelector(state => state.crypto.topHundred);

  const infiniteScrollElement = useRef(null);
  const isInView = useIsInViewport(infiniteScrollElement);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getTopHundred());
  }, []);

  useEffect(() => {
    if (isInView && page !== 0) {
      dispatch(getNextPageOnTopHundred(page + 1));
    }
    if (isInView) {
      setPage(s => s + 1);
    }
  }, [isInView]);

  return (
    <section className={classes.container}>
      <GlobalData className={classes['global-data']} />
      <Card className={classes.card}>
        <h1 className={classes.title}>Top Hundred</h1>
        <p className={classes['powered-by']}>Powered by CoinGecko</p>
        <CoinDataTable coinData={topHundred} />
        <div ref={infiniteScrollElement}></div>
      </Card>
    </section>
  );
};

export default TopHundred;
