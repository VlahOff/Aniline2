import { getTopHundred } from '../../(cryptoApi)/cryptoApi';
import { dummyTopHundred } from '../../(devDummyData)/dummyData';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getTopHundred(query.get('page'));
		} else {
			data = dummyTopHundred;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
