import { percentParser } from '../../../utils/percentParser';
import { usdPriceParser } from '../../../utils/priceParser';
import Button from '../../UI/button/Button';
import classes from './PortfolioTable.module.css';

const PortfolioTable = ({ transactions }) => {
  const onTransactionSelect = (event, transactionId) => {
    console.log(event.target.tagName);
    console.log(event);
  };

  return (
    <div className={classes['table-container']}>
      <table className={classes.table}>
        <thead>
          <tr>
            <td className={`${classes['first-col']} ${classes['sticky-col']}`}><p>Asset</p></td>
            <td className={classes['second-col']}><p>Balance</p></td>
            <td className={classes['third-col']}><p>Bought Price (USD)</p></td>
            <td className={classes['fourth-col']}><p>Current Price (USD)</p></td>
            <td className={classes['fifth-col']}><p>24h Change (%)</p></td>
            <td className={classes['sixth-col']}><p>PNL</p></td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {transactions && transactions.map(t => {
            return (
              <tr
                key={t.transactionId}
                className={classes.tr}
                onClick={(e) => onTransactionSelect(e, t.transactionId)}
              >
                <td className={`${classes['first-col']} ${classes['sticky-col']}`}>
                  <img src={t.image} alt="coin logo" />
                  <div className="asset-name">
                    <strong>{t.name}</strong>
                    <p>{t.symbol.toUpperCase()}</p>
                  </div>
                </td>
                <td className={classes['second-col']}>
                  <strong>{t.quantity} {t.symbol.toUpperCase()}</strong>
                  <p className={classes.spacer}>≈</p>
                  <p>{usdPriceParser(t.value)}</p>
                </td>
                <td className={classes['third-col']}>
                  <p>{usdPriceParser(t.boughtPrice)}</p>
                </td>
                <td className={classes['fourth-col']}>
                  <p>{usdPriceParser(t.current_price)}</p>
                </td>
                <td className={classes['fifth-col']}>
                  <p>{percentParser(t.price_change_percentage_24h)}</p>
                </td>
                <td className={classes['sixth-col']}>
                  <p>{usdPriceParser(t.pnlValue)}</p>
                  <p>{percentParser(t.pnlPercent)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
};

export default PortfolioTable;