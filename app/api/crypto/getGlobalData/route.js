import { getGlobalData } from '../../(cryptoApi)/cryptoApi';
import { dummyGlobalData } from '../../(devDummyData)/dummyData';

export async function GET() {
	try {
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getGlobalData();
		} else {
			data = dummyGlobalData;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
