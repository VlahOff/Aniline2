import { useDispatch, useSelector } from 'react-redux';

import ReactApexChart from 'react-apexcharts';
import { getCoinDetails } from '../../../store/crypto-actions';
import Button from '../../UI/button/Button';

import classes from './CoinChart.module.css';

const CoinChart = ({
  coinId,
  className
}) => {
  const dispatch = useDispatch();
  const coinDetailsOHLC = useSelector(state => state.crypto.coinDetailsOHLC);
  const theme = useSelector(state => state.ui.theme);

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
    }
  };

  return (
    <div className={`${classes['chart-container']} ${className}`}>
      <div className={classes['btn-wrapper']} onClick={onPeriodSelection}>
        <Button className={classes.btn} id='1'>1D</Button>
        <Button className={classes.btn} id='7'>1W</Button>
        <Button className={classes.btn} id='14'>2W</Button>
        <Button className={classes.btn} id='30'>1M</Button>
        <Button className={classes.btn} id='60'>3M</Button>
        <Button className={classes.btn} id='90'>6M</Button>
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