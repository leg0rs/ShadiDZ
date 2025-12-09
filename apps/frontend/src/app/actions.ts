'use server';

import { createClient } from '@packages/utils/src/api/client/index'; // или твой путь к client
import { analyze, hello } from '@packages/utils/src/api/sdk.gen';
import { unstable_cache } from 'next/cache';

const client = createClient({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/v0',
});

const getCachedAnalyzeData = unstable_cache(
	async (params: any) => {
		const { data } = await analyze({
			client,
			query: params,
		});
		return data;
	},
	['analyze-data-key'],
	{
		revalidate: 60,
		tags: ['analyze'],
	},
);

const getCachedHelloData = unstable_cache(
	async () => {
		const { data } = await hello({ client });
		return data;
	},
	['hello-data-key'],
	{ revalidate: 60, tags: ['hello'] },
);

export async function getAnalyzeAction() {
	return await getCachedAnalyzeData({
		latitude: 55.76874,
		longitude: 37.588835,
		address: 'Москва, улица Гашека, 7с1',
		area: 25,
	});
}

export async function getHelloAction() {
	return await getCachedHelloData();
}
