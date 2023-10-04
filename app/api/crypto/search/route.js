import { getSearchResults } from '../../(cryptoApi)/cryptoApi';

export async function GET(req) {
	try {
		const query = req.nextUrl.searchParams;
		const queryString = query.get('query');

		const data = await getSearchResults(queryString);

		return Response.json({ data }, { status: 200 });
	} catch (error) {
		return Response.json({ error });
	}
}
