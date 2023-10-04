import { getNewCoins } from '../../(cryptoApi)/cryptoApi';
import { dummyNewCoins } from '../../(devDummyData)/dummyData';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getNewCoins(query.get('page'));
		} else {
			data = dummyNewCoins;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error });
	}
}
