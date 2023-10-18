'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCoinDetails } from '@/redux/actions/cryptoActions';
import { createChart } from 'lightweight-charts';
import Button from '../button/Button';

import styles from './CoinChart.module.css';

const CoinChart = ({ coinName, coinId, coinDetailsOHLC, className }) => {
	const dispatch = useDispatch();
	const data = JSON.parse(JSON.stringify(coinDetailsOHLC));
	const theme = useSelector(state => state.ui.theme);

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
			upColor: theme === 'light' ? '#006455' : '#009981',
			downColor: theme === 'light' ? '#c20e20' : '#FD374A',
			borderVisible: false,
			wickUpColor: theme === 'light' ? '#006455' : '#009981',
			wickDownColor: theme === 'light' ? '#c20e20' : '#FD374A',
		});
		newSeries.setData(data);

		return () => chart.remove();
	}, [theme, data]);

	const [activePeriod, setActivePeriod] = useState(1);

	const onPeriodSelection = event => {
		if (event.target.tagName === 'BUTTON') {
			dispatch(getCoinDetails(coinId, event.target.id));
			setActivePeriod(event.target.id);
		}
	};

	return (
		<div className={`${styles['chart-container']} ${className}`}>
			<div
				className={styles['btn-wrapper']}
				onClick={onPeriodSelection}
			>
				<Button
					className={`${styles.btn} ${
						activePeriod == '1' && styles['btn-active']
					}`}
					id="1"
				>
					1D
				</Button>
				<Button
					className={`${styles.btn} ${
						activePeriod == '7' && styles['btn-active']
					}`}
					id="7"
				>
					1W
				</Button>
				<Button
					className={`${styles.btn} ${
						activePeriod == '14' && styles['btn-active']
					}`}
					id="14"
				>
					2W
				</Button>
				<Button
					className={`${styles.btn} ${
						activePeriod == '30' && styles['btn-active']
					}`}
					id="30"
				>
					1M
				</Button>
				<Button
					className={`${styles.btn} ${
						activePeriod == '90' && styles['btn-active']
					}`}
					id="90"
				>
					3M
				</Button>
				<Button
					className={`${styles.btn} ${
						activePeriod == '180' && styles['btn-active']
					}`}
					id="180"
				>
					6M
				</Button>
			</div>
			<div
				className={`${className} ${styles.chart}`}
				ref={chartContainerRef}
			/>
		</div>
	);
};

export default CoinChart;
