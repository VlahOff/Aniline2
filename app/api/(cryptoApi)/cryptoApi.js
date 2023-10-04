import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3/';
const COINMARKETCAP_V1 = 'https://pro-api.coinmarketcap.com/v1/';
const COINMARKETCAP_V2 = 'https://pro-api.coinmarketcap.com/v2/';

const CMC_HEADER = { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY };

const getTopThree = async () => {
	const data = await getTopHundred();
	const excludeStableCoins = [
		'tether',
		'usd-coin',
		'binance-usd',
		'dai',
		'paxos-standard',
		'true-usd',
		'usdd',
	];

	const response = [];

	while (response.length <= 3) {
		const coin = data.shift();
		if (!excludeStableCoins.includes(coin.id)) {
			response.push(coin);
		}
	}

	return response;
};

const getTopHundred = async (page = 1) => {
	const data = await axios.get(
		`${COINGECKO_API}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
	);

	data.map(coin => {
		return {
			id: coin.id,
			name: coin.name,
			symbol: coin.symbol,
			total_supply: coin.total_supply,
			last_updated: coin.last_updated,
			current_price: coin.current_price,
			market_cap: coin.market_cap,
			price_change_percentage_1h_in_currency:
				coin.price_change_percentage_1h_in_currency,
			price_change_percentage_24h_in_currency:
				coin.price_change_percentage_24h_in_currency,
			price_change_percentage_7d_in_currency:
				coin.price_change_percentage_7d_in_currency,
			image: coin.image,
		};
	});

	return data;
};

const getNewCoins = async (page = 1) => {
	const coinsRes = await axios.get(
		`${COINMARKETCAP_V1}cryptocurrency/listings/latest?sort=date_added&start=${page}`,
		{
			headers: CMC_HEADER,
		}
	);

	const coinsData = coinsRes.data.data;
	const coinsId = coinsData.map(coin => coin.slug);

	const coinsMetaDataRes = await axios.get(
		`${COINMARKETCAP_V2}cryptocurrency/info?slug=${coinsId.join(',')}&aux=logo`,
		{ headers: CMC_HEADER }
	);

	const coinsMetaData = Object.values(coinsMetaDataRes.data.data).reverse();

	const data = coinsData.map((coin, i) => {
		return {
			id: coin.slug,
			name: coin.name,
			symbol: coin.symbol.toLowerCase(),
			total_supply: coin.total_supply,
			last_updated: coin.last_updated,
			current_price: coin.quote.USD.price,
			market_cap: coin.self_reported_market_cap,
			price_change_percentage_1h_in_currency: coin.quote.USD.percent_change_1h,
			price_change_percentage_24h_in_currency:
				coin.quote.USD.percent_change_24h,
			price_change_percentage_7d_in_currency: coin.quote.USD.percent_change_7d,
			image: coinsMetaData[i].logo,
		};
	});

	return data;
};

const getCryptoMap = async () => {
	const res = await axios.get(
		`${COINMARKETCAP_V1}cryptocurrency/map?sort=cmc_rank`,
		{
			headers: CMC_HEADER,
		}
	);

	const data = res.data.data.map(coin => {
		return {
			id: coin.id,
			name: coin.name,
			slug: coin.slug,
			symbol: coin.symbol,
		};
	});

	return data;
};

const getFiatMap = async () => {
	const res = await axios.get(`${COINMARKETCAP_V1}fiat/map`, {
		headers: CMC_HEADER,
	});

	const data = res.data.data.map(coin => {
		return {
			id: coin.id,
			name: coin.name,
			sign: coin.sign,
			symbol: coin.symbol,
		};
	});

	return data;
};

const getAllCoins = async () => {
	const res = await axios.get(
		`${COINGECKO_API}coins/list?include_platform=false`
	);

	return res.data;
};

const getGlobalData = async () => {
	const res = await axios.get(`${COINGECKO_API}global`);
	const data = res.data.data;

	return {
		total_market_cap: data.total_market_cap.usd,
		market_cap_change_percentage_24h_usd:
			data.market_cap_change_percentage_24h_usd,
		trading_volume: data.total_volume.usd,
		btc_dominance: data.market_cap_percentage.btc,
		number_of_coins: data.active_cryptocurrencies,
	};
};

const getCoinDetails = async coinId => {
	const res = await axios.get(
		`${COINGECKO_API}coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false`
	);

	const data = res.data;
	const low_high_value =
		((data.market_data.current_price.usd - data.market_data.low_24h.usd) *
			100) /
		(data.market_data.high_24h.usd - data.market_data.low_24h.usd);

	return {
		id: data.id,
		symbol: data.symbol,
		name: data.name,
		image: data.image,
		current_price: data.market_data.current_price.usd,
		market_cap: data.market_data.market_cap.usd,
		total_volume: data.market_data.total_volume.usd,
		high_24h: data.market_data.high_24h.usd,
		low_24h: data.market_data.low_24h.usd,
		low_high_value: low_high_value > 0 ? low_high_value : 0,
		price_change_24h: data.market_data.price_change_24h,
		price_change_percentage_24h: data.market_data.price_change_percentage_24h,
		market_cap_change_24h: data.market_data.market_cap_change_24h,
		market_cap_change_percentage_24h:
			data.market_data.market_cap_change_percentage_24h,
		circulating_supply: data.market_data.circulating_supply,
		total_supply: data.market_data.total_supply,
		max_supply: data.market_data.max_supply,
		ath: data.market_data.ath.usd,
		ath_change_percentage: data.market_data.ath_change_percentage.usd,
		ath_date: data.market_data.ath_date.usd,
		atl: data.market_data.atl.usd,
		atl_change_percentage: data.market_data.atl_change_percentage.usd,
		atl_date: data.market_data.atl_date.usd,
		last_updated: data.market_data.last_updated,
	};
};

const getCoinOHLC = async (coinId, days = 1) => {
	const res = await axios.get(
		`${COINGECKO_API}coins/${coinId}/ohlc?vs_currency=usd&days=${days}`
	);

	console.log(res);
	const data = res.data.map(v => {
		return {
			time: v[0] / 1000,
			open: v[1],
			high: v[2],
			low: v[3],
			close: v[4],
		};
	});

	return data;
};

const getSearchResults = async query => {
	const res = await axios.get(`${COINGECKO_API}search?query=${query}`);

	return res.data.coins;
};

const getConversionResult = async (amount, fromCurrency, toCurrency) => {
	const res = await axios.get(
		`${COINMARKETCAP_V2}tools/price-conversion?amount=${amount}&id=${fromCurrency}&convert_id=${toCurrency}`,
		{
			headers: CMC_HEADER,
		}
	);

	return res.data.data;
};

export {
	getTopThree,
	getTopHundred,
	getNewCoins,
	getCryptoMap,
	getFiatMap,
	getAllCoins,
	getGlobalData,
	getCoinDetails,
	getCoinOHLC,
	getSearchResults,
	getConversionResult,
};
