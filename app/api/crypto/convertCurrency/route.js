import { getConversionResult } from '../../(cryptoApi)/cryptoApi';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const amount = query.get('amount');
		const fromCurrency = query.get('from');
		const toCurrency = query.get('to');

		const data = await getConversionResult(amount, fromCurrency, toCurrency);

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
