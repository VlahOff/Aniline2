import { getTopThree } from '../../(cryptoApi)/cryptoApi';
import { dummyTopThree } from '../../(devDummyData)/dummyData';

export async function GET(req) {
	try {
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getTopThree();
		} else {
			data = dummyTopThree;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
