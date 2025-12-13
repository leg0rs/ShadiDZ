'use server';

import { createClient } from '@packages/utils/src/api/client/index';
import * as sdk from '@packages/utils/src/api/sdk.gen';
import { unstable_cache } from 'next/cache';

const client = createClient({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080',
});

// Для интерактивных запросов (поиск, сортировка, пагинация) кеш отключен
export async function getCountriesAction(
	params: NonNullable<Parameters<typeof sdk.countriesControllerGetCountries>[0]['query']>,
) {
	const { data } = await sdk.countriesControllerGetCountries({
		client,
		query: params,
	});
	return data;
}

export async function getCountryAction(countryId: string) {
	const cachedFn = unstable_cache(
		async () => {
			const { data } = await sdk.countriesControllerGetCountry({
				client,
				path: { countryId },
			});
			return data;
		},
		['country', countryId],
		{
			revalidate: 60,
			tags: ['countries'],
		},
	);

	return cachedFn();
}
