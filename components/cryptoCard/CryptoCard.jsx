import { percentParser } from '../../utils/percentParser';
import { usdPriceParser } from '../../utils/priceParser';
import Button from '../button/Button';
import Card from '../card/Card';
import classes from './CryptoCard.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CryptoCard = ({
	name,
	symbol,
	current_price,
	price_change_percentage_24h_in_currency,
	price_change_percentage_7d_in_currency,
	image,
	id,
}) => {
	const router = useRouter();
	const onCoinSelect = () => {
		router.push(`/coin-details/${id}`);
	};

	return (
		<Card className={classes.card}>
			<header className={classes.header}>
				<div className={`${classes.ribbon} ${classes['ribbon-top-left']}`}>
					<span>{name}</span>
				</div>
				<Image
					src={image}
					alt={`${symbol} logo`}
					className={classes['coin-logo']}
					width={58}
					height={58}
				/>
			</header>
			<main className={classes['card-main']}>
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
