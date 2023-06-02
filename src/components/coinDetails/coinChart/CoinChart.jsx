import { useDispatch, useSelector } from 'react-redux';

import ReactApexChart from 'react-apexcharts';
import { getCoinDetails } from '../../../store/crypto-actions';
import Button from '../../UI/button/Button';

import classes from './CoinChart.module.css';
import { useState } from 'react';

const CoinChart = ({
  coinId,
  className
}) => {
  const dispatch = useDispatch();
  const coinDetailsOHLC = useSelector(state => state.crypto.coinDetailsOHLC);
  const theme = useSelector(state => state.ui.theme);

  const [activePeriod, setActivePeriod] = useState(1);

  const series = [{
    data: coinDetailsOHLC
  }];

  const options = {
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    theme: {
      mode: theme,
      palette: 'palette1',
    }
  };

  const onPeriodSelection = (event) => {
    if (event.target.tagName === 'BUTTON') {
      dispatch(getCoinDetails(coinId, event.target.id));
      setActivePeriod(event.target.id);
    }
  };

  return (
    <div className={`${classes['chart-container']} ${className}`}>
      <div className={classes['btn-wrapper']} onClick={onPeriodSelection}>
        <Button 
        className={`${classes.btn} ${activePeriod == '1' && classes['btn-active']}`} 
        id='1'
        >1D</Button>
        <Button 
        className={`${classes.btn} ${activePeriod == '7' && classes['btn-active']}`} 
        id='7'
        >1W</Button>
        <Button 
        className={`${classes.btn} ${activePeriod == '14' && classes['btn-active']}`} 
        id='14'
        >2W</Button>
        <Button 
        className={`${classes.btn} ${activePeriod == '30' && classes['btn-active']}`} 
        id='30'
        >1M</Button>
        <Button 
        className={`${classes.btn} ${activePeriod == '60' && classes['btn-active']}`} 
        id='60'
        >3M</Button>
        <Button 
        className={`${classes.btn} ${activePeriod == '90' && classes['btn-active']}`} 
        id='90'
        >6M</Button>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={'100%'}
        width={'100%'}
      />
    </div>
  );
};

export default CoinChart;