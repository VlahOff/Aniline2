import { getCoinDetails } from '../../(cryptoApi)/cryptoApi';
import { dummyCoinDetails } from '../../(devDummyData)/dummyData';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getCoinDetails(query.get('coinId'));
		} else {
			data = dummyCoinDetails;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
