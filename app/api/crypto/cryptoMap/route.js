import { getCryptoMap } from '../../(cryptoApi)/cryptoApi';
import { dummyCryptoMap } from '../../(devDummyData)/dummyData';

export async function GET() {
	try {
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getCryptoMap();
		} else {
			data = dummyCryptoMap;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
