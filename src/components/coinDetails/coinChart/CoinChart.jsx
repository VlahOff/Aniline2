import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

import classes from './CoinChart.module.css';

const CoinChart = ({
  className
}) => {
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

  return (
    <div className={`${classes['chart-container']} ${className}`}>
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