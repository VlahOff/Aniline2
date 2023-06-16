import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { cryptoActions } from '../../store/crypto';
import { getSearchResults } from '../../store/crypto-actions';
import Card from '../UI/card/Card';
import InputWithDropdown from '../UI/inputWithDropdown/InputWithDropdown';

import classes from './Search.module.css';

const Search = () => {
	const dispatch = useDispatch();
	const searchResults = useSelector(state => state.crypto.searchResults);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.trim().length > 0) {
				dispatch(getSearchResults(query));
			}
		}, 600);

		return () => clearTimeout(timer);
	}, [query]);

	useEffect(() => {
		return () => {
			dispatch(cryptoActions.setSearchResults([]));
		};
	}, []);

	const onInputHandler = event => {
		setQuery(event.target.value);
	};

	return (
		<Card className={classes['search-form']}>
			<form className={classes.form}>
				<InputWithDropdown
					id={'query'}
					label={'Search'}
					value={query}
					onChange={onInputHandler}
					isDropdownShown={searchResults}
				>
					{searchResults.map(result => {
						return (
							<Link
								className={classes.result}
								key={result.id}
								to={`/coin-details/${result.id}`}
							>
								<div className={classes.logo}>
									<img
										src={result.thumb}
										alt="Coin logo"
									/>
								</div>
								<p>{result.name}</p>
								<p>{result.symbol.toUpperCase()}</p>
							</Link>
						);
					})}
				</InputWithDropdown>
			</form>
		</Card>
	);
};

export default Search;
