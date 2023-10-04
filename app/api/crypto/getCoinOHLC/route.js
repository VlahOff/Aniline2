import { getCoinOHLC } from '../../(cryptoApi)/cryptoApi';
import { dummyCoinOHLC } from '../../(devDummyData)/dummyData';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const coinId = query.get('coinId');
		const days = query.get('days');

		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getCoinOHLC(coinId, days);
		} else {
			data = dummyCoinOHLC.coinOHLC;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
