import { getConversionResult } from '../../(cryptoApi)/cryptoApi';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const amount = query.get('amount');
		const fromCurrency = query.get('fromCurrency');
		const toCurrency = query.get('toCurrency');

		const data = await getConversionResult(amount, fromCurrency, toCurrency);

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
