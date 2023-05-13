import { useForm } from '../../hooks/useForm';
import Card from '../UI/card/Card';
import Input from '../UI/input/Input';
import classes from './CryptoConverter.module.css';

const CryptoConverter = () => {
  const { formValues, isFormValid, changeHandler, blurHandler, resetValues } = useForm({
    from: '',
    to: '',
  });

  const onConvertSubmitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {

    }
  };

  return (
    <Card className={classes.converter}>
      <form onSubmit={onConvertSubmitHandler}>
        <h1 className={classes.title}>Cryptocurrency Converter</h1>
        <Input
          label='From'
          id='from'
          onChange={changeHandler}
          value={formValues.from}
        />

        <Input
          label='To'
          id='to'
          onChange={changeHandler}
          value={formValues.to}
        />

        {/* <div className="amount-input-container">
          <div className="input-container">
            <div className="input">
              <i className="input-icon fa-solid fa-coins"></i>
              <input type="text" placeholder="Enter amount"
                formControlName="amount" (keyup)="setAmount()" autofocus>
              <div className="input-icon"></div>
            </div>
          </div>
        </div> */}

        {/* <div className="currency-selector-container">

          <div className="input-container">
            <div className="input">
              <div className="input-icon"></div>
              <input #inputFrom 
            (input)="filterFrom(inputFrom.value)"
              autocomplete="off"
              className="input" id="from"
              placeholder="Bitcoin"
              formControlName="from" 
            type="text">
              <i className="input-icon fa-regular fa-square-caret-down"></i>
              <div className="menu-content" [class.on]="(cryptoMap$ | async)" >
              <button type="button" 
              *ngFor="let coin of (cryptoMap$ | async)"
              (click)="fromCrypto(coin)"
              >{{ coin.name }} - {{ coin.symbol | uppercase }}</button>
          </div>

        </div> */}

        {/* <div className="input-container">
        <div className="input">
          <div className="input-icon"></div>
          <input #inputTo 
            (input)="filterTo(inputTo.value)"
          autocomplete="off"
          className="input" id="to"
          placeholder="USD"
          formControlName="to" 
            type="text">
          <i className="input-icon fa-regular fa-square-caret-down"></i>
          <div className="menu-content" [class.on]="(fiatMap$ | async)">
          <button type="button" 
              *ngFor="let coin of (fiatMap$ | async)"
          (click)="toFiat(coin)"
              >{{ coin.name }} - {{ coin.symbol | uppercase }}</button>
      </div>
    </div >
        </div >
          
      </div >

  <div className="button-container">
    <button type="submit" className="button" [disabled]="!converterForm.valid">
    <i className="fa-solid fa-arrows-rotate"></i> Convert</button>
      </div >

  <div className="output">
    <p className="output-field" *ngIf="result$ | async">
    {{ (result$ | async)!.amount}}
    {{ (result$ | async)!.name}}
    ({{ (result$ | async)!.symbol}}) =
    {{ (result$ | async)!.quote[(to$ | async)!.id].price | number:'1.2-2' }}
    {{ (to$ | async)!.name}}
    "{{ (to$ | async)!.sign}}"
    ({{ (to$ | async)!.symbol}})
  </p>
      </div > */}

      </form >
    </Card>
  );
};

export default CryptoConverter;