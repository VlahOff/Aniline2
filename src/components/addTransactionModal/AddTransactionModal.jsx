import { useDispatch } from 'react-redux';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import InputWithDropdown from '../../components/inputWithDropdown/InputWithDropdown';
import Modal from '../../components/modal/Modal';
import { useForm } from '../../hooks/useForm';
import { portfolioActions } from '../../store/portfolio';
import {
	filterAllCoinsList,
	submitTransaction,
} from '../../store/portfolio-actions';

import classes from './AddTransactionModal.module.css';

const isNumberPositive = value => {
	return Number(value) > 0;
};

const AddTransactionModal = ({ allCoinsList }) => {
	const dispatch = useDispatch();
	const { formValues, isFormValid, changeHandler, setValues } = useForm({
		coinId: '',
		coinName: '',
		coinNameValid: null,
		coinPrice: '',
		coinPriceValid: null,
		quantity: '',
		quantityValid: null,
	});

	const onCoinSelectHandler = coin => {
		setValues(state => ({
			...state,
			coinName: coin.name,
			coinId: coin.id,
		}));
		dispatch(portfolioActions.clearFilteredAllCoins());
	};

	const onCoinInputHandler = event => {
		setValues(state => ({
			...state,
			coinId: '',
			coinName: event.target.value,
			coinNameValid: event.target.value.trim().length > 0,
		}));
		dispatch(filterAllCoinsList(event.target.value));
	};

	const onCloseHandler = () => {
		dispatch(portfolioActions.toggleAddModal());
		dispatch(portfolioActions.clearFilteredAllCoins());
	};

	const onSubmitHandler = event => {
		event.preventDefault();
		isFormValid && dispatch(submitTransaction(formValues));
	};

	return (
		<Modal
			onClose={onCloseHandler}
			className={classes.modal}
		>
			<form onSubmit={onSubmitHandler}>
				<h1 className={classes.title}>Add Transaction</h1>
				<div className={classes['input-container']}>
					<InputWithDropdown
						label={'Coin'}
						id={'coinId'}
						value={formValues.coinName}
						error={formValues.coinNameValid}
						errorMessage={'Please select a coin.'}
						onChange={onCoinInputHandler}
						isDropdownShown={allCoinsList}
					>
						{allCoinsList &&
							allCoinsList.map(c => {
								return (
									<p
										key={c.id}
										className={classes.item}
										onClick={() => onCoinSelectHandler(c)}
									>
										{c.name} - {c.symbol.toUpperCase()}
									</p>
								);
							})}
					</InputWithDropdown>
					<Input
						label={'Price per coin'}
						id={'coinPrice'}
						value={formValues.coinPrice}
						error={formValues.coinPriceValid}
						errorMessage={'Enter value greater than 0'}
						onChange={e => changeHandler(e, isNumberPositive)}
						type={'number'}
					/>
					<Input
						label={'Quantity'}
						id={'quantity'}
						value={formValues.quantity}
						error={formValues.quantityValid}
						errorMessage={'Enter value greater than 0'}
						onChange={e => changeHandler(e, isNumberPositive)}
						type={'number'}
					/>
					<Input
						label={'Total spent'}
						id={'total'}
						value={formValues.quantity * formValues.coinPrice}
						disabled={true}
					/>
				</div>
				<div className={classes['btn-container']}>
					<Button
						onClick={onCloseHandler}
						className={classes['cancel-btn']}
					>
						Cancel
					</Button>
					<Button
						type={'submit'}
						disabled={!isFormValid}
					>
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddTransactionModal;
