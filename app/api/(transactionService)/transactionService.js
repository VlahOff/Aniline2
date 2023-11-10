import { Transaction } from '../(models)/Transaction';

export async function getAllUserTransactions(userId) {
	return Transaction.find({ owner: userId }).lean();
}

export async function createTransaction(data, userId) {
	const transaction = await Transaction.create({
		coinId: data.coinId,
		coinPrice: data.coinPrice,
		quantity: data.quantity,
		owner: userId,
	});

	return transaction;
}

export async function editTransaction(data, transactionId) {
	const transaction = await Transaction.findByIdAndUpdate(
		transactionId,
		{
			coinId: data.coinId,
			coinPrice: data.boughtPrice,
			quantity: data.quantity,
		},
		{ new: true }
	);

	return transaction;
}

export async function deleteTransaction(transactionId) {
	return Transaction.findByIdAndRemove(transactionId);
}
