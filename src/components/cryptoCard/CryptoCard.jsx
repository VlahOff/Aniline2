import { useNavigate } from 'react-router-dom';

import { percentParser } from '../../utils/percentParser';
import { usdPriceParser } from '../../utils/priceParser';
import Button from '../button/Button';
import Card from '../card/Card';

import classes from './CryptoCard.module.css';

const CryptoCard = ({
	name,
	symbol,
	current_price,
	price_change_percentage_24h_in_currency,
	price_change_percentage_7d_in_currency,
	image,
	id,
}) => {
	const navigate = useNavigate();
	const onCoinSelect = () => {
		navigate(`/coin-details/${id}`);
	};

	return (
		<Card className={classes.card}>
			<header className={classes.header}>
				<div className={`${classes.ribbon} ${classes['ribbon-top-left']}`}>
					<span>{name}</span>
				</div>
				<img
					src={image}
					alt={`${symbol} logo`}
					className={classes['coin-logo']}
				/>
			</header>
			<main className={classes.main}>
				<p>Price: {usdPriceParser(current_price)}</p>
				<p>24h: {percentParser(price_change_percentage_24h_in_currency)}</p>
				<p>7d: {percentParser(price_change_percentage_7d_in_currency)}</p>
			</main>
			<footer className={classes.footer}>
				<Button onClick={onCoinSelect}>Details</Button>
			</footer>
		</Card>
	);
};

export default CryptoCard;
