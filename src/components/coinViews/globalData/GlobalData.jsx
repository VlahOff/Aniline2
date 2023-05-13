import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGlobalData } from '../../../store/crypto-actions';
import { percentParser } from '../../../utils/percentParser';
import { priceParser } from '../../../utils/priceParser';

import classes from './GlobalData.module.css';

const GlobalData = (props) => {
  const dispatch = useDispatch();
  const globalData = useSelector(state => state.crypto.globalData);

  useEffect(() => {
    dispatch(getGlobalData());
  });

  return (
    <section className={`${classes['global-data-container']} ${props.className}`}>
      <article className={classes.card}>
        <h3 className={classes.title}>Market Capitalization</h3>
        <hr />
        <div className={classes['top-row-cap']}>
          <p>{priceParser(globalData.total_market_cap)}</p>
          <p>{percentParser(globalData.market_cap_change_percentage_24h_usd)}</p>
        </div>
      </article>
      <article className={classes.card}>
        <h3 className={classes.title}>24h Trading Volume</h3>
        <hr />
        <div className={classes['top-row']}>
          <p>{priceParser(globalData.trading_volume)}</p>
        </div>
      </article>
      <article className={classes.card}>
        <h3 className={classes.title}>BTC Market Cap Dominance</h3>
        <hr />
        <div className={classes['top-row']}>
          <p>{percentParser(globalData.btc_dominance)}</p>
        </div>
      </article>
      <article className={classes.card}>
        <h3 className={classes.title}># of Coins</h3>
        <hr />
        <div className={classes['top-row']}>
          <p>{globalData.number_of_coins}</p>
        </div>
      </article>
    </section>
  );
};

export default GlobalData;