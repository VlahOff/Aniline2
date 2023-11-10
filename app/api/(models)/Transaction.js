import { Schema, model, ObjectId } from 'mongoose';

const transactionSchema = new Schema({
	coinId: { type: String, required: true },
	coinPrice: { type: Number, required: true },
	quantity: { type: Number, required: true },
	owner: { type: ObjectId, ref: 'User' },
});

const Transaction = model('Transaction', transactionSchema);

export { Transaction };
