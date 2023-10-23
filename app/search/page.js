'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/card/Card';
import InputWithDropdown from '@/components/inputWithDropdown/InputWithDropdown';
import { getSearchResults } from '@/redux/actions/cryptoActions';
import { cryptoActions } from '@/redux/slices/cryptoSlice';

import styles from './page.module.css';

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
	}, [dispatch, query]);

	useEffect(() => {
		return () => {
			dispatch(cryptoActions.setSearchResults([]));
		};
	}, []);

	const onInputHandler = event => {
		setQuery(event.target.value);
	};

	return (
		<section className={styles.wrapper}>
			<Card className={styles['search-form']}>
				<form className={styles.form}>
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
									className={styles.result}
									key={result.id}
									href={`/coin-details/${result.id}`}
								>
									<div>
										<Image
											src={result.thumb}
											alt="Coin logo"
											width={25}
											height={25}
											quality={100}
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
		</section>
	);
};

export default Search;
