import { percentParser } from '../../utils/percentParser';
import { priceParser } from '../../utils/priceParser';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './CryptoCard.module.css';

const CryptoCard = ({
  name,
  symbol,
  current_price,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  image
}) => {
  return (
    <Card className={classes.card}>
      <header className={classes.header}>
        <h2 className={classes.name}>{name}</h2>
        <img src={image} alt={`${symbol} logo`} className={classes['coin-logo']} />
      </header>
      <main className={classes.main}>
        <p>Price: {priceParser(current_price)}</p>
        <p>24h: {percentParser(price_change_percentage_24h_in_currency)}</p>
        <p>7d: {percentParser(price_change_percentage_7d_in_currency)}</p>
      </main>
      <footer className={classes.footer}>
        <Button>Details</Button>
      </footer>
    </Card>
  );
};

export default CryptoCard;