import { getAllCoins } from '../../(cryptoApi)/cryptoApi';
import { dummyAllCoins } from '../../(devDummyData)/dummyData';

export async function GET() {
	try {
		const envType = process.env.NODE_ENV;

		let data;
		if (envType === 'production') {
			data = await getAllCoins();
		} else {
			data = dummyAllCoins;
		}

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
