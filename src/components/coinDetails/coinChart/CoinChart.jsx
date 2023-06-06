import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createChart } from 'lightweight-charts';
import { getCoinDetails } from '../../../store/crypto-actions';
import Button from '../../UI/button/Button';

import classes from './CoinChart.module.css';

const CoinChart = ({ coinId, coinDetailsOHLC, className }) => {
  const dispatch = useDispatch();
  const data = JSON.parse(JSON.stringify(coinDetailsOHLC));
  const theme = useSelector((state) => state.ui.theme);

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: {
        background: { color: theme === 'light' ? '#a0a2a7' : '#282c33' },
        textColor: theme === 'light' ? 'black' : 'white',
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
      kineticScroll: {
        mouse: true,
        touch: true,
      },
      timeScale: {
        timeVisible: true,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [theme, data]);

  const [activePeriod, setActivePeriod] = useState(1);

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
          className={`${classes.btn} ${
            activePeriod == '1' && classes['btn-active']
          }`}
          id="1"
        >
          1D
        </Button>
        <Button
          className={`${classes.btn} ${
            activePeriod == '7' && classes['btn-active']
          }`}
          id="7"
        >
          1W
        </Button>
        <Button
          className={`${classes.btn} ${
            activePeriod == '14' && classes['btn-active']
          }`}
          id="14"
        >
          2W
        </Button>
        <Button
          className={`${classes.btn} ${
            activePeriod == '30' && classes['btn-active']
          }`}
          id="30"
        >
          1M
        </Button>
        <Button
          className={`${classes.btn} ${
            activePeriod == '90' && classes['btn-active']
          }`}
          id="90"
        >
          3M
        </Button>
        <Button
          className={`${classes.btn} ${
            activePeriod == '180' && classes['btn-active']
          }`}
          id="180"
        >
          6M
        </Button>
      </div>
      <div
        className={`${className} ${classes.chart}`}
        ref={chartContainerRef}
      />
    </div>
  );
};

export default CoinChart;
