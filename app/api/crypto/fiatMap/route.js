import { getFiatMap } from '../../(cryptoApi)/cryptoApi';
import { dummyFiatMap } from '../../(devDummyData)/dummyData';

export async function GET() {
	try {
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getFiatMap();
		} else {
			data = dummyFiatMap;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
