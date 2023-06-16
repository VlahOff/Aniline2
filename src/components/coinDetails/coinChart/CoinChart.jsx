import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createChart } from 'lightweight-charts';
import { getCoinDetails } from '../../../store/crypto-actions';
import Button from '../../UI/button/Button';

import classes from './CoinChart.module.css';

const CoinChart = ({ coinName, coinId, coinDetailsOHLC, className }) => {
  const dispatch = useDispatch();
  const data = JSON.parse(JSON.stringify(coinDetailsOHLC));
  const theme = useSelector((state) => state.ui.theme);

  const chartContainerRef = useRef();

  useEffect(() => {
    const priceFormat = () => {
      const price = data[0]?.low;
      const indexOfDecimal = price?.toString().indexOf('.');
      let value;

      indexOfDecimal
        ? (value = price?.toString().slice(indexOfDecimal).length - 1)
        : (value = 2);

      return value > 16 ? 16 : value;
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
      crosshair: {
        mode: 0,
      },
      kineticScroll: {
        mouse: true,
        touch: true,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      watermark: {
        visible: true,
        text: coinName,
        color: '#7c7c7c48',
        fontFamily: 'Arial',
        fontSize: '86',
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      priceFormat: {
        type: priceFormat() > 3 ? 'volume' : 'price',
        precision: priceFormat(),
        minMove: 0.01,
      },
      upColor: theme === 'light' ? '#004925' : '#26a69a',
      downColor: theme === 'light' ? '#AB0000' : '#ef5350',
      borderVisible: false,
      wickUpColor: theme === 'light' ? '#004925' : '#26a69a',
      wickDownColor: theme === 'light' ? '#AB0000' : '#ef5350',
    });
    newSeries.setData(data);

    return () => chart.remove();
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
