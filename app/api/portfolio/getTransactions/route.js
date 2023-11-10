import connectDb from '../../(connectToDb)/connectDb';
import { getCoinDetails } from '../../(cryptoApi)/cryptoApi';
import { getAllUserTransactions } from '../../(transactionService)/transactionService';

export async function GET(req) {
	try {
		await connectDb();
		// console.log(req);
		// const data = await getDetailedTransactions();

		return Response.json({ data: 'data' }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}

async function getDetailedTransactions(userId) {
	const transactions = await getAllUserTransactions(userId);
	if (!transactions) {
		throw new Error('NO_TRANSACTIONS_FOR_USER');
	}

	const detailedTransactions = transactions.map(t => {
		return (t = getCoinDetails(t.coinId));
	});

	const result = [];
	await Promise.all(detailedTransactions)
		.then(data => {
			transactions.forEach((t, i) => {
				result.push(createTransactionDetailed(t, data[i]));
			});
		})
		.catch(err => {
			throw new Error(err);
		});

	return result;
}

function createTransactionDetailed(transactionData, details) {
	return {
		coinId: transactionData.coinId,
		boughtPrice: transactionData.coinPrice,
		quantity: transactionData.quantity,
		transactionId: transactionData._id,
		value: transactionData.quantity * details.current_price,
		pnlValue:
			(details.current_price - transactionData.coinPrice) *
			transactionData.quantity,
		pnlPercent:
			((details.current_price * transactionData.quantity -
				transactionData.coinPrice * transactionData.quantity) /
				(transactionData.coinPrice * transactionData.quantity)) *
			100,
		id: details.id,
		symbol: details.symbol,
		name: details.name,
		image: details.image.small,
		current_price: details.current_price,
		price_change_24h: details.price_change_24h,
		price_change_percentage_24h: details.price_change_percentage_24h,
	};
}
