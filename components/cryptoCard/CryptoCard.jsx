import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { percentParser } from '../../utils/percentParser';
import { usdPriceParser } from '../../utils/priceParser';
import Button from '../button/Button';
import Card from '../card/Card';

import styles from './CryptoCard.module.css';

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
		<Card className={styles.card}>
			<header className={styles.header}>
				<div className={`${styles.ribbon} ${styles['ribbon-top-left']}`}>
					<span>{name}</span>
				</div>
				<Image
					src={image}
					alt={`${symbol} logo`}
					className={styles['coin-logo']}
					width={58}
					height={58}
				/>
			</header>
			<main className={styles['card-main']}>
				<p>Price: {usdPriceParser(current_price)}</p>
				<p>24h: {percentParser(price_change_percentage_24h_in_currency)}</p>
				<p>7d: {percentParser(price_change_percentage_7d_in_currency)}</p>
			</main>
			<footer className={styles.footer}>
				<Button onClick={onCoinSelect}>Details</Button>
			</footer>
		</Card>
	);
};

export default CryptoCard;
